import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'uuid-user-id',
    description: 'User ID (User modeldan foreign key)',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'uuid-region-id',
    description: 'Region ID (Region modeldan foreign key)',
    required: false,
  })
  @IsOptional()
  @IsString()
  regionId?: string;

  @ApiProperty({
    example: 'Toshkent shahar, Chilonzor tumani',
    description: 'Xaridor manzili',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
}
