import { ApiProperty } from '@nestjs/swagger';
import { RoleTypes } from '@prisma/client';

export class UpdateRoleRequestDto {
  @ApiProperty({
    description: 'Nome do Perfil',
  })
  name: RoleTypes;

  @ApiProperty({
    description: 'Status da Perfil',
  })
  isActive: boolean;
}
