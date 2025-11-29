import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
  })
  @IsString()
  @Length(8, 255)
  password: string;
}
