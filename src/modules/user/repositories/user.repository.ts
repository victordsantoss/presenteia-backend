import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { PrismaService } from '../../../database/core/prisma.service';
import { IBaseRepository } from 'src/common/repositories/base.repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IBaseRepository<User>
{
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }
}
