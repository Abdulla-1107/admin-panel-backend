import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSellerDto {
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

  @ApiProperty({ example: 'Super Shop', description: 'Do‘kon nomi' })
  @IsNotEmpty()
  @IsString()
  shopName: string;
}
