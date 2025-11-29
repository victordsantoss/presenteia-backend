import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  Min,
  Length,
  IsUrl,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { GiftPriority } from '@prisma/client';

export class CreateGiftRequestDto {
  @ApiProperty({
    description: 'Nome do presente',
    example: 'Jogo de Panelas Tramontina',
  })
  @IsString()
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'Descrição do presente',
    example: 'Jogo com 5 peças antiaderentes',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Preço do presente',
    example: 299.9,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Quantidade disponível',
    example: 1,
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    description: 'URL da imagem do presente',
    example: 'https://exemplo.com/imagem.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Permite múltiplas contribuições (vaquinha)',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  allowMultipleContributions?: boolean;

  @ApiProperty({
    description: 'Prioridade do presente',
    enum: GiftPriority,
    example: GiftPriority.MEDIUM,
    default: GiftPriority.MEDIUM,
  })
  @IsEnum(GiftPriority)
  @IsOptional()
  priority?: GiftPriority;

  @ApiProperty({
    description: 'ID da categoria',
    example: 'clx1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: 'Links de sugestão do presente',
    example: [
      'https://www.amazon.com.br/produto',
      'https://www.magazineluiza.com.br/produto',
    ],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  links?: string[];
}

export class GiftLinkResponseDto {
  @ApiProperty({
    description: 'URL do link de sugestão',
    example: 'https://www.amazon.com.br/produto',
  })
  url: string;
}

export class CreateGiftResponseDto {
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
    example: 'clx1234567890',
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
    description: 'Links de sugestão do presente',
    type: [GiftLinkResponseDto],
    required: false,
  })
  links?: GiftLinkResponseDto[];
}
