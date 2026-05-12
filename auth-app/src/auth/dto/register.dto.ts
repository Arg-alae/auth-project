import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Ali',
    description: 'Le nom de l utilisateur',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ali@test.com',
    description: 'L email de l utilisateur',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Le mot de passe — minimum 6 caractères',
  })
  @IsString()
  @MinLength(8)
  password: string;
}