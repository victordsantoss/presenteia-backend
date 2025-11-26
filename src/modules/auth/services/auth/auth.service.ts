import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { IAuthService } from './auth.interface';
import type { IUserRepository } from '../../../user/repositories/user.repository.interface';
import type { IPasswordService } from '../password/password.interface';
import { JwtService } from '@nestjs/jwt';
import type { Cache } from 'cache-manager';
import type { ISessionRepository } from '../../repositories/session.repository.interface';
import type { IAuthenticatedUserRequestDto } from '../../../../common/dtos/auth.request.dto';
import type { User } from '@prisma/client';
import { ConnectionType } from '../../../../common/enums/connection-type.enum';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ISessionRepository')
    private readonly sessionRepository: ISessionRepository,
    @Inject('IPasswordService')
    private readonly passwordService: IPasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<string> {
    const user = await this.validateUser(email);

    const isPasswordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const existingSessions =
      await this.sessionRepository.findActiveSessionsByUserId(user.id);

    if (existingSessions.length > 0) {
      for (const session of existingSessions) {
        session.endDate = new Date();
        session.isActive = false;
        const payload = {
          token: session.token,
          endDate: new Date(),
          isActive: false,
        };
        await this.sessionRepository.update(session.id, payload);
      }
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const connectionType = this.getConnectionType(userAgent);

    await this.sessionRepository.create({
      userId: user.id,
      token: token,
      type: connectionType,
      ipAddress: ipAddress || null,
      startDate: new Date(),
      endDate: null,
      isActive: true,
    });
    return token;
  }

  private async validateUser(email: string): Promise<User> {
    this.logger.log(`Validando usuário por email: ${email}`);
    const user = await this.userRepository.findOneBy('email', email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  private getConnectionType(userAgent?: string): ConnectionType {
    if (!userAgent) return ConnectionType.UNKNOWN;

    if (userAgent.includes('Mobile')) return ConnectionType.MOBILE;
    if (userAgent.includes('Tablet')) return ConnectionType.TABLET;
    if (userAgent.includes('Postman')) return ConnectionType.POSTMAN;
    if (userAgent.includes('curl')) return ConnectionType.CURL;
    if (userAgent.includes('Insomnia')) return ConnectionType.INSOMNIA;

    return ConnectionType.WEB;
  }

  public async logout(
    authenticatedUserData: IAuthenticatedUserRequestDto,
  ): Promise<boolean> {
    const tokenExpiration = this.jwtService.decode(authenticatedUserData.token)[
      'exp'
    ];
    await this.cacheManager.set(
      `blacklist:${authenticatedUserData.token}`,
      true,
      tokenExpiration - Math.floor(Date.now() / 1000),
    );

    const currSession = await this.sessionRepository.findOneBy(
      'token',
      authenticatedUserData.token,
    );

    currSession.endDate = new Date();
    currSession.isActive = false;

    await this.sessionRepository.update(currSession.id, currSession);
    return true;
  }
}
