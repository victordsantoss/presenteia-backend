import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetEventResponseDto {
  @ApiProperty({
    description: 'Slug do evento',
    example: 'cha-de-casa-nova',
  })
  @IsString()
  slug: string;
}
