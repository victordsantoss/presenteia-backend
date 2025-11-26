import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum, IsOptional, Length } from 'class-validator';
import { EventVisibility } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({
    description: 'Título do evento',
    example: 'Chá de Casa Nova',
  })
  @IsString()
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Estamos realizando nosso sonho da casa própria!',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Data do evento',
    example: '2024-12-31T20:00:00Z',
  })
  @IsDateString()
  eventDate: string;

  @ApiProperty({
    description: 'Local do evento',
    example: 'Rua das Flores, 123 - São Paulo, SP',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  location?: string;

  @ApiProperty({
    description: 'Visibilidade do evento',
    enum: EventVisibility,
    example: EventVisibility.PUBLIC,
    default: EventVisibility.PUBLIC,
  })
  @IsEnum(EventVisibility)
  @IsOptional()
  visibility?: EventVisibility;
}

