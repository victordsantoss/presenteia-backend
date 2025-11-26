import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { IGetEventService } from './get/get.interface';
import type { EventDto } from '../dtos/event.dto';
import type { IEventRepository } from '../repositories/event.interface';
import { Event } from '@prisma/client';

@Injectable()
export class GetEventService implements IGetEventService {
  private readonly logger = new Logger(GetEventService.name);

  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async perform(slug: string): Promise<EventDto> {
    this.logger.log(`Buscando evento pelo slug: ${slug}`);

    const event = await this.eventRepository.findOneBy('slug', slug);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (!event.isActive) {
      throw new NotFoundException('Evento não está mais disponível');
    }

    return this.normalizeResponse(event);
  }

  private normalizeResponse(event: Event): EventDto {
    this.logger.log(`Normalizando resposta do evento: ${event.title}`);
    return {
      id: event.id,
      title: event.title,
      description: event.description ?? undefined,
      eventDate: event.eventDate,
      location: event.location ?? undefined,
      visibility: event.visibility,
      slug: event.slug,
      organizerId: event.organizerId,
      isActive: event.isActive,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      deletedAt: event.deletedAt ?? undefined,
    };
  }
}

