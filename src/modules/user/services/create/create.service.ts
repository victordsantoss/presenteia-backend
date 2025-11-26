import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { ICreateUserRequestDto } from '../../dtos/create-user.request.dto';
import type { IUserRepository } from '../../repositories/user.interface';
import type { IUserResponseDto } from '../../dtos/user.response.dto';
import { User, RoleTypes } from '@prisma/client';
import type { ICreateUserService } from './create.interface';
import type { IGetRoleService } from 'src/modules/access-control/services/role/get-role/get-role.interface';
import type { IPasswordService } from 'src/modules/auth/services/password/password.interface';

type CreateUserPayload = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  roleId: string;
};

@Injectable()
export class CreateUserService implements ICreateUserService {
  private readonly logger = new Logger(CreateUserService.name);
  private readonly _emailField: keyof User = 'email';
  private readonly _cpfField: keyof User = 'cpf';

  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    @Inject('IGetRoleService')
    private readonly getRoleService: IGetRoleService,
  ) {}

  async perform(userData: ICreateUserRequestDto): Promise<IUserResponseDto> {
    this.logger.log(`Iniciando processo de criação de usuário`);
    await this.findUserByEmail(userData.email);
    await this.findUserByCpf(userData.cpf);

    const hashedPassword = await this.passwordService.createHash(
      userData.password,
    );

    const role = await this.getRoleService.perform(RoleTypes.USER);

    const userPayload: CreateUserPayload = {
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      password: hashedPassword,
      roleId: role.id,
    };

    const createdUser = await this.userRepository.create(userPayload as any);

    return this.normalizeResponse(createdUser);
  }

  private async findUserByEmail(email: string) {
    this.logger.log(`Buscando usuário por email: ${email}`);
    const existingUserByEmail = await this.userRepository.findOneBy(
      this.emailField,
      email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException('Usuário com este Email já existe');
    }
  }

  private async findUserByCpf(cpf: string) {
    this.logger.log(`Buscando usuário por CPF: ${cpf}`);
    const existingUserByCpf = await this.userRepository.findOneBy(
      this._cpfField,
      cpf,
    );
    if (existingUserByCpf) {
      throw new BadRequestException('Usuário com este CPF já existe');
    }
  }

  private normalizeResponse(user: User): IUserResponseDto {
    this.logger.log(`Normalizando resposta do usuário: ${user.name}`);
    return {
      isActive: user.isActive,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      roleId: user.roleId ?? undefined,
      provider: user.provider,
      birthDate: user.birthDate ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  get emailField(): keyof User {
    return this._emailField;
  }
}
