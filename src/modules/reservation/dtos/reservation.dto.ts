import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class ReservationDto {
  @ApiProperty({ description: 'ID da reserva' })
  id: string;

  @ApiProperty({ description: 'ID do presente' })
  giftId: string;

  @ApiProperty({ description: 'ID do usuário', required: false })
  userId?: string;

  @ApiProperty({ description: 'Nome do convidado', required: false })
  guestName?: string;

  @ApiProperty({ description: 'Email do convidado', required: false })
  guestEmail?: string;

  @ApiProperty({ description: 'Telefone do convidado', required: false })
  guestPhone?: string;

  @ApiProperty({ description: 'Token de acesso para convidado', required: false })
  guestToken?: string;

  @ApiProperty({ description: 'Valor da contribuição' })
  contributionAmount: number;

  @ApiProperty({ description: 'Status da reserva', enum: ReservationStatus })
  status: ReservationStatus;

  @ApiProperty({ description: 'Mensagem', required: false })
  message?: string;

  @ApiProperty({ description: 'Data da reserva' })
  reservedAt: Date;

  @ApiProperty({ description: 'Data de confirmação', required: false })
  confirmedAt?: Date;

  @ApiProperty({ description: 'Data de entrega', required: false })
  deliveredAt?: Date;
}

