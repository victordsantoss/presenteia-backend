import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../common/repositories/base.repository';
import { Role } from '@prisma/client';
import { PrismaService } from '../../../../database/core/prisma.service';
import { IBaseRepository } from 'src/common/repositories/base.repository.interface';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role>
  implements IBaseRepository<Role>
{
  constructor(prisma: PrismaService) {
    super(prisma, 'role');
  }
}
