import { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import { User } from '@prisma/client';
import { IRegisterUserRequestDto } from '../dtos/register-user.request.dto';

export interface IUserRepository
  extends IBaseRepository<User, IRegisterUserRequestDto> {

}
