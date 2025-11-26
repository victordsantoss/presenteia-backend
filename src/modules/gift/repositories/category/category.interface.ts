import { IBaseRepository } from '../../../../common/repositories/base.repository.interface';
import { Category, Prisma } from '@prisma/client';

export interface ICategoryRepository
  extends IBaseRepository<Category, Prisma.CategoryCreateInput> {}
