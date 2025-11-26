import { Inject, Injectable, Logger } from '@nestjs/common';
import type { IGetRoleService } from './get-role.interface';
import type { RoleTypes, Role } from '@prisma/client';
import type { IRoleRepository } from '../../../repositories/role/role.interface';

@Injectable()
export class GetRoleService implements IGetRoleService {
  private readonly logger = new Logger(GetRoleService.name);
  constructor(
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
  ) {}

  perform(name: RoleTypes): Promise<Role | null> {
    this.logger.log(`Iniciando processo de obtenção do perfil ${name}`);
    return this.roleRepository.findOneBy('name', name);
  }
}
