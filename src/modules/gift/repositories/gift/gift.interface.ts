import { IBaseRepository } from '../../../../common/repositories/base.repository.interface';
import { Gift, Prisma } from '@prisma/client';

export interface GiftFilters {
  eventId: string;
  categoryId?: string;
  search?: string;
  orderBy?: string;
  sortBy?: 'ASC' | 'DESC';
}

export interface IGiftRepository
  extends IBaseRepository<Gift, Prisma.GiftCreateInput> {
  findAvailableByEventId(eventId: string, categoryId?: string): Promise<Gift[]>;
  findByIdWithLinks(id: string): Promise<Gift | null>;
  findWithFilters(filters: GiftFilters): Promise<Gift[]>;
}
