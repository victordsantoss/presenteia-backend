import { User } from '@prisma/client';
import { IUserResponseDto } from '../../dtos/user.response.dto';

export interface ICreateUserService {
  perform(user: Partial<User>): Promise<IUserResponseDto>;
}
