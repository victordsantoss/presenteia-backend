import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../database/database.module';
import { CreateUserService } from './services/create/create.service';
import { AccessControlModule } from '../access-control/access-control.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [PrismaModule, CommonModule, AccessControlModule, AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'ICreateUserService',
      useClass: CreateUserService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['ICreateUserService', 'IUserRepository'],
})
export class UserModule {}
