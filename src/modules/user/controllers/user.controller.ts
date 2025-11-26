import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CpfGuard } from '../../../common/guards/cpf.guard';
import { IRegisterUserRequestDto } from '../dtos/register-user.request.dto';
import { IUserResponseDto } from '../dtos/user.response.dto';
import type { IRegisterUserService } from '../services/register/register.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IRegisterUserService')
    private readonly registerUserService: IRegisterUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiBody({
    type: IRegisterUserRequestDto,
    description: 'Dados de registro do usuário',
  })
  @UseGuards(CpfGuard)
  async create(
    @Body() userData: IRegisterUserRequestDto,
  ): Promise<IUserResponseDto> {
    return await this.registerUserService.perform(userData);
  }
}
