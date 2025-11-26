import type { IBaseRepository } from '../../../common/repositories/base.repository.interface';
import type { CreateSessionRequestDto } from '../dtos/create-session.request.dto';
import type { UpdateSessionRequestDto } from '../dtos/update-session.request.dto';
import type { GetAuthenticatedUserResponseDto } from '../dtos/get-user.response.dto';
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
