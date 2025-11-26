import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
  Ip,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginRequestDto } from '../dtos/login.request.dto';
import type { IAuthService } from '../services/auth/auth.interface';
import { JwtAuthGuard } from '../../../common/guards/auth.guard';
import type { IAuthenticatedUserRequestDto } from '../../../common/dtos/auth.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário autenticado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de autenticação.' })
  @ApiBody({
    type: LoginRequestDto,
    description: 'Dados de autenticação do usuário',
  })
  async login(
    @Body() loginData: LoginRequestDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent?: string,
  ): Promise<string> {
    return await this.authService.login(
      loginData.email,
      loginData.password,
      ip,
      userAgent,
    );
  }

  @Post('logout')
  @ApiOperation({ summary: 'Deslogar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário deslogado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de logout.' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async logout(
    @Request() req: { user: IAuthenticatedUserRequestDto },
  ): Promise<boolean> {
    return this.authService.logout(req.user);
  }
}
