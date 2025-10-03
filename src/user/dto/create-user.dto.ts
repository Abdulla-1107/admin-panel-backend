import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export enum Role {
  user = 'user',
  admin = 'admin',
  superadmin = 'superAdmin',
  moderator = 'moderator',
  operator = 'operator',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Abdulla', description: 'Foydalanuvchining ismi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'abdulla@gmail.com', description: 'Email manzili' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 'myStrongPassword123', description: 'Parol' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'USER',
    enum: Role,
    description: 'Foydalanuvchi roli',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({
    example: false,
    description: 'Foydalanuvchi tasdiqlanganmi yoki yo‘q',
  })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;
}
