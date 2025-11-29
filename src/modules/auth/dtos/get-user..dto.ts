import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'cm3xk2lqh0000uw8qz5j5z5j5',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-00',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Provedor de autenticação',
    example: 'LOCAL',
  })
  @IsString()
  provider: string;

  @ApiProperty({
    description: 'Data de nascimento',
    example: '1990-01-01',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate: Date | null;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}

export class GetAuthenticatedUserResponseDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 'cm3xk2lqh0001uw8qz5j5z5j6',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Token JWT de autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Se a sessão está ativa',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Data de início da sessão',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Data de fim da sessão',
    example: '2024-01-02T00:00:00.000Z',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate: Date | null;

  @ApiProperty({
    description: 'Dados do usuário autenticado',
    type: GetUserResponseDto,
  })
  @Type(() => GetUserResponseDto)
  user: GetUserResponseDto;
}
