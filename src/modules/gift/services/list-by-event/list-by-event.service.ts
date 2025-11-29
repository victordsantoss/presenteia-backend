import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import type { IListGiftsByEventService } from './list-by-event.interface';
import type { GiftWithAvailabilityDto } from '../../dtos/gift-with-availability.dto';
import type {
  ListGiftsByEventRequestDto,
  ListGiftsByEventResponseDto,
} from '../../dtos/list-gifts-by-event.dto';
import { GiftAvailabilityStatus } from '../../dtos/list-gifts-by-event.dto';
import type { IGiftRepository } from '../../repositories/gift/gift.interface';
import type { IEventRepository } from '../../../event/repositories/event.interface';

@Injectable()
export class ListGiftsByEventService implements IListGiftsByEventService {
  private readonly logger = new Logger(ListGiftsByEventService.name);

  constructor(
    @Inject('IGiftRepository')
    private readonly giftRepository: IGiftRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async perform(
    eventId: string,
    filters: ListGiftsByEventRequestDto,
  ): Promise<ListGiftsByEventResponseDto> {
    const {
      page = 1,
      limit = 10,
      categoryId,
      status = GiftAvailabilityStatus.ALL,
      search,
      orderBy = 'priority',
      sortBy = 'DESC',
    } = filters;

    this.logger.log(
      `Listando presentes do evento: ${eventId} - Página: ${page}, Limite: ${limit}, Categoria: ${categoryId || 'todas'}, Status: ${status}, Busca: ${search || 'nenhuma'}`,
    );

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (!event.isActive) {
      throw new NotFoundException('Evento não está mais disponível');
    }

    const gifts = await this.giftRepository.findAvailableByEventId(
      eventId,
      categoryId,
    );

    // Normalizar e aplicar filtros
    let normalizedGifts = gifts.map((gift) => this.normalizeResponse(gift));

    // Filtrar por status de disponibilidade
    if (status !== GiftAvailabilityStatus.ALL) {
      normalizedGifts = normalizedGifts.filter((gift) => {
        if (status === GiftAvailabilityStatus.AVAILABLE) {
          return gift.isAvailable;
        }
        if (status === GiftAvailabilityStatus.RESERVED) {
          return !gift.isAvailable;
        }
        return true;
      });
    }

    // Filtrar por busca de texto
    if (search) {
      const searchLower = search.toLowerCase();
      normalizedGifts = normalizedGifts.filter(
        (gift) =>
          gift.name.toLowerCase().includes(searchLower) ||
          gift.description?.toLowerCase().includes(searchLower) ||
          gift.category?.toLowerCase().includes(searchLower),
      );
    }

    // Ordenar
    normalizedGifts = this.sortGifts(normalizedGifts, orderBy, sortBy);

    // Calcular total antes da paginação
    const total = normalizedGifts.length;
    const totalPages = Math.ceil(total / limit);

    // Aplicar paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGifts = normalizedGifts.slice(startIndex, endIndex);

    return {
      data: paginatedGifts,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  private sortGifts(
    gifts: GiftWithAvailabilityDto[],
    orderBy: string,
    sortBy: 'ASC' | 'DESC',
  ): GiftWithAvailabilityDto[] {
    const sorted = [...gifts];

    sorted.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (orderBy) {
        case 'priority':
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (sortBy === 'ASC') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }

  private normalizeResponse(gift: any): GiftWithAvailabilityDto {
    const activeReservations =
      gift.reservations?.filter(
        (r: any) => r.status === 'PENDING' || r.status === 'CONFIRMED',
      ) || [];

    const totalContributed = activeReservations.reduce(
      (sum: number, r: any) =>
        sum + (r.contributionAmount ? Number(r.contributionAmount) : 0),
      0,
    );

    const reservedQuantity = gift.allowMultipleContributions
      ? 0
      : activeReservations.length;

    const availableQuantity = gift.allowMultipleContributions
      ? 0
      : gift.quantity - reservedQuantity;

    const giftPrice = gift.price ? Number(gift.price) : 0;
    const remainingAmount = gift.allowMultipleContributions
      ? giftPrice - totalContributed
      : 0;

    const isAvailable = gift.allowMultipleContributions
      ? remainingAmount > 0
      : availableQuantity > 0;

    const reservations = activeReservations.map((r: any) => ({
      reservedBy: r.userId
        ? r.user?.name || 'Usuário'
        : r.guestName || 'Anônimo',
      reservedAt: r.reservedAt,
      contributionAmount: r.contributionAmount
        ? Number(r.contributionAmount)
        : undefined,
    }));

    return {
      id: gift.id,
      name: gift.name,
      description: gift.description ?? undefined,
      price: gift.price ? Number(gift.price) : undefined,
      quantity: gift.quantity,
      imageUrl: gift.imageUrl ?? undefined,
      allowMultipleContributions: gift.allowMultipleContributions,
      priority: gift.priority,
      categoryId: gift.categoryId ?? undefined,
      category: gift.category?.name ?? undefined,
      eventId: gift.eventId,
      isAvailable,
      reservedQuantity,
      availableQuantity,
      totalContributed,
      remainingAmount,
      reservations,
      createdAt: gift.createdAt,
      updatedAt: gift.updatedAt,
      links: gift.links?.map((link: any) => ({
        id: link.id,
        url: link.url,
        createdAt: link.createdAt,
      })),
    };
  }
}
