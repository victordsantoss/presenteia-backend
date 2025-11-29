import { ApiProperty } from '@nestjs/swagger';
import { GiftPriority } from '@prisma/client';
import { GiftLinkDto } from './gift-link.dto';

export class GiftDto {
  @ApiProperty({
    description: 'ID do presente',
    example: 'clx1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do presente',
    example: 'Jogo de Panelas Tramontina',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição do presente',
    example: 'Jogo com 5 peças antiaderentes',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Preço do presente',
    example: 299.9,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Quantidade disponível',
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'URL da imagem do presente',
    example: 'https://exemplo.com/imagem.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Permite múltiplas contribuições (vaquinha)',
    example: false,
  })
  allowMultipleContributions: boolean;

  @ApiProperty({
    description: 'Prioridade do presente',
    enum: GiftPriority,
    example: GiftPriority.MEDIUM,
  })
  priority: GiftPriority;

  @ApiProperty({
    description: 'ID da categoria',
    example: 'clx9876543210',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'ID do evento',
    example: 'clx1111111111',
  })
  eventId: string;

  @ApiProperty({
    description: 'Status ativo do presente',
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

  @ApiProperty({
    description: 'Links de sugestão do presente',
    type: [GiftLinkDto],
    required: false,
  })
  links?: GiftLinkDto[];
}
