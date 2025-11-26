import { IBaseRepository } from '../../../../common/repositories/base.repository.interface';
import { Role } from '@prisma/client';
import { CreateRoleRequestDto } from '../../dtos/create-role.request.dto';
import { UpdateRoleRequestDto } from '../../dtos/update-role.request.dto';

export interface IRoleRepository
  extends IBaseRepository<Role, CreateRoleRequestDto, UpdateRoleRequestDto> {}
