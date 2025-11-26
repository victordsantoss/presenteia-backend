import { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import { Reservation, Prisma } from '@prisma/client';

export interface IReservationRepository
  extends IBaseRepository<Reservation, Prisma.ReservationCreateInput> {
  findActiveByGiftId(giftId: string): Promise<Reservation[]>;
  findByUserId(userId: string): Promise<Reservation[]>;
  findByGuestToken(token: string): Promise<Reservation | null>;
}

