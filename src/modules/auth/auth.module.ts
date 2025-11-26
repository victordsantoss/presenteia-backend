import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { SessionRepository } from './repositories/session.repository';
import { AuthService } from './services/auth/auth.service';
import { PasswordService } from './services/password/password.service';
import { AccessControlModule } from '../access-control/access-control.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: (() => {
        const secret = process.env.JWT_SECRET || 'centraldafe';
        return secret;
      })(),
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AccessControlModule),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'ISessionRepository',
      useClass: SessionRepository,
    },
    {
      provide: 'IPasswordService',
      useClass: PasswordService,
    },
  ],
  exports: ['ISessionRepository', 'IPasswordService'],
})
export class AuthModule {}
