import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class IUserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-00',
  })
  cpf: string;

  @ApiProperty({
    description: 'Se o usuário está ativo',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Provedor de autenticação',
  })
  provider: string;

  @ApiProperty({
    description: 'Data de nascimento',
    required: false,
  })
  birthDate?: Date;

  @ApiProperty({
    description: 'Data de criação',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'ID do perfil do usuário',
    required: false,
  })
  roleId?: string;
}
