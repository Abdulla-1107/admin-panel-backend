import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  regionId: number;

  @ApiProperty({ example: 'TASH' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Toshkent viloyati' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Toshkent' })
  @IsString()
  @IsNotEmpty()
  whereTitle: string;

  @ApiProperty({ example: 'tashkent' })
  @IsString()
  @IsNotEmpty()
  webUri: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isWholeCountry: boolean;

  @ApiProperty({ example: 'Uzbekistan/Tashkent' })
  @IsString()
  titlePath: string;

  @ApiProperty({ example: 'region' })
  @IsString()
  locationType: string;

  @ApiProperty({ example: '41.3111,69.2406' })
  @IsString()
  locationCoordinates: string;

  @ApiProperty({ example: 'tashkent-info-uz' })
  @IsString()
  webUriInfoUz: string;

  @ApiProperty({ example: 'tashkent-info-ru' })
  @IsString()
  webUriInfoRu: string;

  @ApiPropertyOptional({ example: 'uuid-1' })
  @IsOptional()
  @IsUUID()
  parentId?: string | null;
}
