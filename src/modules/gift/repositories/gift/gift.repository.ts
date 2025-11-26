import { Injectable } from '@nestjs/common';
import { Gift, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/core/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';
import type { IGiftRepository } from './gift.interface';

@Injectable()
export class GiftRepository
  extends BaseRepository<Gift, Prisma.GiftCreateInput>
  implements IGiftRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'gift');
  }

  async findAvailableByEventId(eventId: string): Promise<Gift[]> {
    return this.prisma.gift.findMany({
      where: {
        eventId,
        isActive: true,
      },
      include: {
        reservations: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
        },
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    });
  }
}
