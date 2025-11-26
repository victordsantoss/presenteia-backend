import { Module } from '@nestjs/common';
import { PrismaModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    PrismaModule,
    AccessControlModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
