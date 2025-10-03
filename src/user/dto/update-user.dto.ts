import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto, Role } from './create-user.dto';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsInt,
  IsDate,
} from 'class-validator';

// Status enum (model bo‘yicha)
export enum UserStatus {
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended',
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'Developer with 5 years of experience' })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/uploads/avatar.png',
  })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/uploads/banner-mobile.png',
  })
  @IsOptional()
  @IsString()
  banner_mobile?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/uploads/banner-desktop.png',
  })
  @IsOptional()
  @IsString()
  banner_desktop?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/uploads/logo.png' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: 'abdulla_dev' })
  @IsOptional()
  @IsString()
  telegram_username?: string;

  @ApiPropertyOptional({ example: 'Abdulla LLC' })
  @IsOptional()
  @IsString()
  business_name?: string;

  @ApiPropertyOptional({ example: 'IT Services' })
  @IsOptional()
  @IsString()
  business_type?: string;

  @ApiPropertyOptional({ example: 'Tashkent' })
  @IsOptional()
  @IsString()
  business_city?: string;

  @ApiPropertyOptional({ example: 'Software Development' })
  @IsOptional()
  @IsString()
  business_category?: string;

  @ApiPropertyOptional({ example: 'https://abdulla.dev' })
  @IsOptional()
  @IsString()
  business_website?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/passports/passport.png',
  })
  @IsOptional()
  @IsString()
  passport_file?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/certificates/certificate.png',
  })
  @IsOptional()
  @IsString()
  business_certificate_file?: string;

  @ApiPropertyOptional({ example: 'facebook' })
  @IsOptional()
  @IsString()
  social_network_account_type?: string;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsOptional()
  @IsString()
  social_network_id?: string;

  @ApiPropertyOptional({ example: 'abdulla@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({ example: 'New Strong Password 123!' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @ApiPropertyOptional({ example: 'active', enum: UserStatus })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional({ example: 'user', enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  regionId?: string;
}
