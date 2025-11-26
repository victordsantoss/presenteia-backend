import { Injectable } from '@nestjs/common';
import { Reservation, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/core/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import type { IReservationRepository } from './reservation.interface';

@Injectable()
export class ReservationRepository
  extends BaseRepository<Reservation, Prisma.ReservationCreateInput>
  implements IReservationRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'reservation');
  }

  async findActiveByGiftId(giftId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: {
        giftId,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: {
        gift: {
          include: {
            event: true,
          },
        },
      },
      orderBy: { reservedAt: 'desc' },
    });
  }

  async findByGuestToken(token: string): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { guestToken: token },
      include: {
        gift: {
          include: {
            event: true,
          },
        },
      },
    });
  }
}

