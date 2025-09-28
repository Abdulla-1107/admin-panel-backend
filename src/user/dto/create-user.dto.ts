import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Foydalanuvchi telefoni',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Foydalanuvchi paroli (kamida 6 ta belgi)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Abdulla Abdusattorov',
    description: 'Foydalanuvchi to‘liq ismi',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'USER',
    description: 'Foydalanuvchi roli',
  })
  @IsOptional()
  role?: 'USER';
}
