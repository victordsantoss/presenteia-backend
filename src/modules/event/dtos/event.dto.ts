import { ApiProperty } from '@nestjs/swagger';
import { EventVisibility } from '@prisma/client';

export class EventDto {
  @ApiProperty({
    description: 'ID do evento',
    example: 'clx1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'Título do evento',
    example: 'Chá de Casa Nova',
  })
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Estamos realizando nosso sonho da casa própria!',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Data do evento',
    example: '2024-12-31T20:00:00Z',
  })
  eventDate: Date;

  @ApiProperty({
    description: 'Local do evento',
    example: 'Rua das Flores, 123 - São Paulo, SP',
    required: false,
  })
  location?: string;

  @ApiProperty({
    description: 'Visibilidade do evento',
    enum: EventVisibility,
    example: EventVisibility.PUBLIC,
  })
  visibility: EventVisibility;

  @ApiProperty({
    description: 'Slug único do evento',
    example: 'cha-de-casa-nova',
  })
  slug: string;

  @ApiProperty({
    description: 'ID do organizador',
    example: 'clx9876543210',
  })
  organizerId: string;

  @ApiProperty({
    description: 'Status ativo do evento',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2024-01-01T10:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão',
    example: null,
    required: false,
  })
  deletedAt?: Date;
}
