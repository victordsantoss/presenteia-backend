import { ApiProperty } from '@nestjs/swagger';
import { GiftPriority } from '@prisma/client';

export class ReservationInfoDto {
  @ApiProperty({
    description: 'Nome de quem reservou',
    example: 'João Silva',
  })
  reservedBy: string;

  @ApiProperty({
    description: 'Data e hora da reserva',
    example: '2024-01-15T10:30:00Z',
  })
  reservedAt: Date;

  @ApiProperty({
    description: 'Valor da contribuição',
    example: 150.00,
  })
  contributionAmount: number;
}

export class GiftWithAvailabilityDto {
  @ApiProperty({ description: 'ID do presente' })
  id: string;

  @ApiProperty({ description: 'Nome do presente' })
  name: string;

  @ApiProperty({ description: 'Descrição do presente', required: false })
  description?: string;

  @ApiProperty({ description: 'Preço do presente' })
  price: number;

  @ApiProperty({ description: 'Quantidade total' })
  quantity: number;

  @ApiProperty({ description: 'URL da imagem', required: false })
  imageUrl?: string;

  @ApiProperty({ description: 'Permite múltiplas contribuições (vaquinha)' })
  allowMultipleContributions: boolean;

  @ApiProperty({ description: 'Prioridade', enum: GiftPriority })
  priority: GiftPriority;

  @ApiProperty({ description: 'ID da categoria', required: false })
  categoryId?: string;

  @ApiProperty({ description: 'ID do evento' })
  eventId: string;

  @ApiProperty({ description: 'Está disponível para reserva' })
  isAvailable: boolean;

  @ApiProperty({ description: 'Quantidade já reservada' })
  reservedQuantity: number;

  @ApiProperty({ description: 'Quantidade disponível' })
  availableQuantity: number;

  @ApiProperty({
    description: 'Valor total arrecadado (para vaquinha)',
    example: 3500.00,
  })
  totalContributed: number;

  @ApiProperty({
    description: 'Valor restante (para vaquinha)',
    example: 1500.00,
  })
  remainingAmount: number;

  @ApiProperty({
    description: 'Informações das reservas',
    type: [ReservationInfoDto],
  })
  reservations: ReservationInfoDto[];

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updatedAt: Date;
}

