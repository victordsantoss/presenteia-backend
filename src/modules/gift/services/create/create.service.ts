import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { ICreateGiftService } from './create.interface';
import type { CreateGiftDto } from '../../dtos/create-gift.dto';
import type { GiftDto } from '../../dtos/gift.dto';
import type { IGiftRepository } from '../../repositories/gift/gift.interface';
import type { ICategoryRepository } from '../../repositories/category/category.interface';
import { Gift, Prisma } from '@prisma/client';

@Injectable()
export class CreateGiftService implements ICreateGiftService {
  private readonly logger = new Logger(CreateGiftService.name);

  constructor(
    @Inject('IGiftRepository')
    private readonly giftRepository: IGiftRepository,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async perform(giftData: CreateGiftDto, eventId: string): Promise<GiftDto> {
    this.logger.log(
      `Iniciando processo de criação de presente: ${giftData.name}`,
    );

    if (giftData.categoryId) {
      const category = await this.categoryRepository.findById(
        giftData.categoryId,
      );
      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }
    }

    if (giftData.quantity && giftData.quantity < 1) {
      throw new BadRequestException('A quantidade deve ser no mínimo 1');
    }

    if (giftData.price < 0) {
      throw new BadRequestException('O preço não pode ser negativo');
    }

    const giftPayload: Prisma.GiftCreateInput = {
      name: giftData.name,
      description: giftData.description,
      price: giftData.price,
      quantity: giftData.quantity || 1,
      imageUrl: giftData.imageUrl,
      allowMultipleContributions: giftData.allowMultipleContributions || false,
      priority: giftData.priority || 'MEDIUM',
      event: {
        connect: { id: eventId },
      },
      ...(giftData.categoryId && {
        category: {
          connect: { id: giftData.categoryId },
        },
      }),
    };

    const createdGift = await this.giftRepository.create(giftPayload);

    return this.normalizeResponse(createdGift);
  }

  private normalizeResponse(gift: Gift): GiftDto {
    this.logger.log(`Normalizando resposta do presente: ${gift.name}`);
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
      isActive: gift.isActive,
      createdAt: gift.createdAt,
      updatedAt: gift.updatedAt,
      deletedAt: gift.deletedAt ?? undefined,
    };
  }
}
