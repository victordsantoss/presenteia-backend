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
} from 'class-validator';
import { GiftPriority } from '@prisma/client';

export class CreateGiftDto {
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
  })
  @IsNumber()
  @Min(0)
  price: number;

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
}
