import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConnectionType } from '../../../common/enums';

export class CreateSessionRequestDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'cm3xk2lqh0000uw8qz5j5z5j5',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Token de autenticação JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Tipo de conexão',
    example: ConnectionType.WEB,
    enum: ConnectionType,
  })
  @IsEnum(ConnectionType)
  type: ConnectionType;

  @ApiProperty({
    description: 'Endereço IP do cliente',
    example: '192.168.1.1',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  ipAddress?: string | null;

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
    description: 'Data de fim da sessão (null se a sessão está ativa)',
    example: null,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date | null;
}
