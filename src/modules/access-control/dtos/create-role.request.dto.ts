import { ApiProperty } from '@nestjs/swagger';
import { RoleTypes } from '@prisma/client';

export class CreateRoleRequestDto {
  @ApiProperty({
    description: 'Nome do Perfil',
  })
  name: RoleTypes;
}
