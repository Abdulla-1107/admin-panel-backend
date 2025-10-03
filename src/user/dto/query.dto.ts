import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator';
import { UserStatus } from './update-user.dto';
import { Role } from './create-user.dto';

export class UserQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: 10, description: 'Limit per page' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Sort by field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort order asc|desc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Search query by name or phone' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 'user',
    description: 'Filter by role',
    enum: Role,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Filter by status',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus, {
    message: 'status faqat active | inactive | suspended bo‘lishi mumkin',
  })
  status?: UserStatus;
}
