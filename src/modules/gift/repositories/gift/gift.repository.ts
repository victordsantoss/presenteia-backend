import { Injectable } from '@nestjs/common';
import { Gift, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/core/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';
import type { IGiftRepository, GiftFilters } from './gift.interface';

@Injectable()
export class GiftRepository
  extends BaseRepository<Gift, Prisma.GiftCreateInput>
  implements IGiftRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'gift');
  }

  async findAvailableByEventId(
    eventId: string,
    categoryId?: string,
  ): Promise<Gift[]> {
    return this.prisma.gift.findMany({
      where: {
        eventId,
        isActive: true,
        ...(categoryId && { categoryId }),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        links: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        reservations: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async findByIdWithLinks(id: string): Promise<Gift | null> {
    return this.prisma.gift.findUnique({
      where: { id },
      include: {
        links: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async findWithFilters(filters: GiftFilters): Promise<Gift[]> {
    const { eventId, categoryId, search, orderBy = 'priority', sortBy = 'DESC' } = filters;

    // Construir condições de busca
    const searchConditions = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              category: {
                name: { contains: search, mode: Prisma.QueryMode.insensitive },
              },
            },
          ],
        }
      : {};

    // Construir ordenação
    const orderByClause = this.buildOrderBy(orderBy, sortBy);

    return this.prisma.gift.findMany({
      where: {
        eventId,
        isActive: true,
        ...(categoryId && { categoryId }),
        ...searchConditions,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        links: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        reservations: {
          where: {
            status: {
              in: ['PENDING', 'CONFIRMED'],
            },
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: orderByClause,
    });
  }

  private buildOrderBy(orderBy: string, sortBy: 'ASC' | 'DESC'): any {
    const direction = sortBy.toLowerCase() as 'asc' | 'desc';

    switch (orderBy) {
      case 'name':
        return { name: direction };
      case 'price':
        return { price: direction };
      case 'createdAt':
        return { createdAt: direction };
      case 'priority':
      default:
        // Ordenação padrão: prioridade DESC, depois createdAt ASC
        return [{ priority: direction }, { createdAt: 'asc' }];
    }
  }
}
