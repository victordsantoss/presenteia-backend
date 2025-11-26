import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { ICreateEventService } from './create/create.interface';
import type { CreateEventDto } from '../dtos/create-event.dto';
import type { EventDto } from '../dtos/event.dto';
import type { IEventRepository } from '../repositories/event.interface';
import { Event, Prisma } from '@prisma/client';

@Injectable()
export class CreateEventService implements ICreateEventService {
  private readonly logger = new Logger(CreateEventService.name);

  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async perform(eventData: CreateEventDto, userId: string): Promise<EventDto> {
    this.logger.log(`Iniciando processo de criação de evento: ${eventData.title}`);

    const eventDate = new Date(eventData.eventDate);
    if (eventDate < new Date()) {
      throw new BadRequestException('A data do evento não pode ser no passado');
    }

    const slug = await this.generateUniqueSlug(eventData.title);

    const eventPayload: Prisma.EventCreateInput = {
      title: eventData.title,
      description: eventData.description,
      eventDate,
      location: eventData.location,
      visibility: eventData.visibility || 'PUBLIC',
      slug,
      organizer: {
        connect: { id: userId },
      },
    };

    const createdEvent = await this.eventRepository.create(eventPayload);

    return this.normalizeResponse(createdEvent);
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = this.slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await this.eventRepository.findOneBy('slug', slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.logger.log(`Slug único gerado: ${slug}`);
    return slug;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim();
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

