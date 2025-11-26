import { IBaseRepository } from '../../../../common/repositories/base.repository.interface';
import { Gift, Prisma } from '@prisma/client';

export interface IGiftRepository
  extends IBaseRepository<Gift, Prisma.GiftCreateInput> {
  findAvailableByEventId(eventId: string): Promise<Gift[]>;
}
