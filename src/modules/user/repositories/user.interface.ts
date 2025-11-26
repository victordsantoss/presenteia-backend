import { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import { User } from '@prisma/client';
import { ICreateUserRequestDto } from '../dtos/create-user.request.dto';

export interface IUserRepository
  extends IBaseRepository<User, ICreateUserRequestDto> {}
