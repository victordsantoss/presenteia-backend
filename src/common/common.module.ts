import { Global, Module } from '@nestjs/common';
import { CpfValidator } from './utils/cpf.utils';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';
import { JwtAuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  providers: [JwtAuthStrategy, JwtAuthGuard, CpfValidator],
  exports: [JwtAuthStrategy, JwtAuthGuard, CpfValidator],
})
export class CommonModule {}
