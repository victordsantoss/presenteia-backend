import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CpfGuard } from '../../../common/guards/cpf.guard';
import { ICreateUserRequestDto } from '../dtos/create-user.request.dto';
import { IUserResponseDto } from '../dtos/user.response.dto';
import type { ICreateUserService } from '../services/create/create.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject('ICreateUserService')
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiBody({
    type: ICreateUserRequestDto,
    description: 'Dados de criação do usuário',
  })
  @UseGuards(CpfGuard)
  async create(
    @Body() userData: ICreateUserRequestDto,
  ): Promise<IUserResponseDto> {
    return await this.createUserService.perform(userData);
  }
}
