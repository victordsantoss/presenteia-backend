import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BasePaginationRequestDto, BasePaginationResponseDto } from 'src/common/dtos/base-pagination.dto';
import { GiftWithAvailabilityDto } from './gift-with-availability.dto';

export enum GiftAvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  ALL = 'ALL',
}

export class ListGiftsByEventRequestDto extends BasePaginationRequestDto {
  @ApiPropertyOptional({
    description: 'ID da categoria para filtrar presentes',
    example: 'clx1234567890',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Filtro de status de disponibilidade do presente',
    example: GiftAvailabilityStatus.AVAILABLE,
    enum: GiftAvailabilityStatus,
    default: GiftAvailabilityStatus.ALL,
  })
  @IsOptional()
  @IsEnum(GiftAvailabilityStatus, {
    message: 'O status deve ser AVAILABLE, RESERVED ou ALL',
  })
  status?: GiftAvailabilityStatus;

  @ApiPropertyOptional({
    description: 'Busca por nome ou descrição do presente',
    example: 'panela',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class ListGiftsByEventResponseDto extends BasePaginationResponseDto<GiftWithAvailabilityDto> {
  @ApiProperty({
    description: 'Lista de presentes com disponibilidade',
    type: [GiftWithAvailabilityDto],
  })
  data: GiftWithAvailabilityDto[];
}

