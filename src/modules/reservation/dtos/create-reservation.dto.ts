import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, Length, IsEmail } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Valor da contribuição',
    example: 150.00,
  })
  @IsNumber()
  @Min(0.01)
  contributionAmount: number;

  @ApiProperty({
    description: 'Mensagem para o organizador',
    example: 'Parabéns pelo casamento!',
    required: false,
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({
    description: 'Nome do convidado (obrigatório se não autenticado)',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  @Length(3, 255)
  @IsOptional()
  guestName?: string;

  @ApiProperty({
    description: 'Email do convidado',
    example: 'joao@email.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  guestEmail?: string;

  @ApiProperty({
    description: 'Telefone do convidado',
    example: '+5511999999999',
    required: false,
  })
  @IsString()
  @IsOptional()
  guestPhone?: string;
}

