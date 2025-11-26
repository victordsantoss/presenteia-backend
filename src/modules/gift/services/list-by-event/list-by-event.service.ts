import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import type { IListGiftsByEventService } from './list-by-event.interface';
import type { GiftWithAvailabilityDto } from '../../dtos/gift-with-availability.dto';
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

  async perform(eventId: string): Promise<GiftWithAvailabilityDto[]> {
    this.logger.log(`Listando presentes do evento: ${eventId}`);

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (!event.isActive) {
      throw new NotFoundException('Evento não está mais disponível');
    }

    const gifts = await this.giftRepository.findAvailableByEventId(eventId);

    return gifts.map((gift) => this.normalizeResponse(gift));
  }

  private normalizeResponse(gift: any): GiftWithAvailabilityDto {
    const activeReservations = gift.reservations?.filter(
      (r: any) => r.status === 'PENDING' || r.status === 'CONFIRMED',
    ) || [];

    const totalContributed = activeReservations.reduce(
      (sum: number, r: any) => sum + Number(r.contributionAmount),
      0,
    );

    const reservedQuantity = gift.allowMultipleContributions
      ? 0
      : activeReservations.length;

    const availableQuantity = gift.allowMultipleContributions
      ? 0
      : gift.quantity - reservedQuantity;

    const remainingAmount = gift.allowMultipleContributions
      ? Number(gift.price) - totalContributed
      : 0;

    const isAvailable = gift.allowMultipleContributions
      ? remainingAmount > 0
      : availableQuantity > 0;

    const reservations = activeReservations.map((r: any) => ({
      reservedBy: r.userId ? r.user?.name || 'Usuário' : r.guestName || 'Anônimo',
      reservedAt: r.reservedAt,
      contributionAmount: Number(r.contributionAmount),
    }));

    return {
      id: gift.id,
      name: gift.name,
      description: gift.description ?? undefined,
      price: Number(gift.price),
      quantity: gift.quantity,
      imageUrl: gift.imageUrl ?? undefined,
      allowMultipleContributions: gift.allowMultipleContributions,
      priority: gift.priority,
      categoryId: gift.categoryId ?? undefined,
      eventId: gift.eventId,
      isAvailable,
      reservedQuantity,
      availableQuantity,
      totalContributed,
      remainingAmount,
      reservations,
      createdAt: gift.createdAt,
      updatedAt: gift.updatedAt,
    };
  }
}

