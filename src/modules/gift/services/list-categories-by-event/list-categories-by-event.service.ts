import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import type { IListCategoriesByEventService } from './list-categories-by-event.interface';
import type { CategoryDto } from '../../dtos/category.dto';
import type { ICategoryRepository } from '../../repositories/category/category.interface';
import type { IEventRepository } from '../../../event/repositories/event.interface';

@Injectable()
export class ListCategoriesByEventService
  implements IListCategoriesByEventService
{
  private readonly logger = new Logger(ListCategoriesByEventService.name);

  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async perform(eventId: string): Promise<CategoryDto[]> {
    this.logger.log(`Listando categorias com presentes do evento: ${eventId}`);

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    if (!event.isActive) {
      throw new NotFoundException('Evento não está mais disponível');
    }

    const categories =
      await this.categoryRepository.findCategoriesByEventId(eventId);

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }
}

