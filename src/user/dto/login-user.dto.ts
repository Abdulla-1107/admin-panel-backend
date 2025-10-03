import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail({}, { message: 'Email noto‘g‘ri kiritilgan' })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Foydalanuvchining paroli',
  })
  @IsNotEmpty({ message: 'Parol bo‘sh bo‘lishi mumkin emas' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;
}
