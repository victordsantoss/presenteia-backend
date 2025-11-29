import type { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import type { CreateSessionRequestDto } from '../dtos/create-session.dto';
import type { UpdateSessionRequestDto } from '../dtos/update-session.dto';
import type { GetAuthenticatedUserResponseDto } from '../dtos/get-user..dto';
import type { Session } from '@prisma/client';

export interface ISessionRepository
  extends IBaseRepository<
    Session,
    CreateSessionRequestDto,
    UpdateSessionRequestDto
  > {
  findActiveSessionsByUserId(userId: string): Promise<Session[]>;
  findActiveUserByToken(
    token: string,
  ): Promise<GetAuthenticatedUserResponseDto>;
}
