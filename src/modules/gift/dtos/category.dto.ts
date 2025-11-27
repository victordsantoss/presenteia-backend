import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'ID da categoria',
    example: 'cm123abc456',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Eletrônicos',
  })
  name: string;
}

