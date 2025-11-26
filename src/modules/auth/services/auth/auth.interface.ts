import type { IAuthenticatedUserRequestDto } from '../../../../common/dtos/auth.request.dto';

export interface IAuthService {
  login(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<string>;
  logout(authenticatedUserData: IAuthenticatedUserRequestDto): Promise<boolean>;
}
