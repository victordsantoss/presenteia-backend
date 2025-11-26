import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/core/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import type { IEventRepository } from './event.interface';

@Injectable()
export class EventRepository
  extends BaseRepository<Event, Prisma.EventCreateInput>
  implements IEventRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'event');
  }

  async findByOrganizerId(organizerId: string): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: { organizerId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
