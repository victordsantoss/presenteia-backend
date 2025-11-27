import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../../../database/core/prisma.service';
import { BaseRepository } from '../../../../common/repositories/base.repository';
import type { ICategoryRepository } from './category.interface';

@Injectable()
export class CategoryRepository
  extends BaseRepository<Category, Prisma.CategoryCreateInput>
  implements ICategoryRepository
{
  constructor(prisma: PrismaService) {
    super(prisma, 'category');
  }

  async findCategoriesByEventId(
    eventId: string,
  ): Promise<Pick<Category, 'id' | 'name'>[]> {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
        gifts: {
          some: {
            eventId,
            isActive: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
