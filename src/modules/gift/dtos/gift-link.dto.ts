import { ApiProperty } from '@nestjs/swagger';

export class GiftLinkDto {
  @ApiProperty({
    description: 'ID do link',
    example: 'clx1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'URL do link de sugestão',
    example: 'https://www.amazon.com.br/produto',
  })
  url: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2024-01-01T10:00:00Z',
  })
  createdAt: Date;
}
