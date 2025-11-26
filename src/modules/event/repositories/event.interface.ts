import { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import { Event, Prisma } from '@prisma/client';

export interface IEventRepository
  extends IBaseRepository<Event, Prisma.EventCreateInput> {
  findByOrganizerId(organizerId: string): Promise<Event[]>;
}
