import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetEventDto {
  @ApiProperty({
    description: 'Slug do evento',
    example: 'cha-de-casa-nova',
  })
  @IsString()
  slug: string;
}
