import type { CategoryDto } from '../../dtos/category.dto';

export interface IListCategoriesByEventService {
  perform(eventId: string): Promise<CategoryDto[]>;
}
