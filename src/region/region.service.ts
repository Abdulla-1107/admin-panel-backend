import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE
  async create(createRegionDto: CreateRegionDto) {
    try {
      const region = await this.prisma.region.create({
        data: {
          regionId: createRegionDto.regionId,
          key: createRegionDto.key,
          title: createRegionDto.title,
          whereTitle: createRegionDto.whereTitle,
          webUri: createRegionDto.webUri,
          isWholeCountry: createRegionDto.isWholeCountry,
          titlePath: createRegionDto.titlePath,
          parentId: createRegionDto.parentId ?? null,
          locationType: createRegionDto.locationType,
          locationCoordinates: createRegionDto.locationCoordinates,
          webUriInfoUz: createRegionDto.webUriInfoUz,
          webUriInfoRu: createRegionDto.webUriInfoRu,
        },
      });

      return {
        success: true,
        message: 'Region successfully created',
        data: region,
      };
    } catch (error) {
      if (error.code === 'P2003') {
        // ❌ Foreign key error
        return {
          success: false,
          message: 'Parent region not found. Invalid parentId.',
        };
      }

      return {
        success: false,
        message: 'Failed to create region',
        error: error.message,
      };
    }
  }

  // ✅ GET ALL
  async findAll() {
    const regions = await this.prisma.region.findMany({
      include: { other_region: true },
    });
    return { success: true, data: regions };
  }

  // ✅ GET ONE
  async findOne(id: string) {
    const region = await this.prisma.region.findUnique({
      where: { id },
      include: { other_region: true },
    });

    if (!region) {
      return { success: false, message: 'Region not found' };
    }

    return { success: true, data: region };
  }

  // ✅ UPDATE
  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      const updated = await this.prisma.region.update({
        where: { id },
        data: {
          ...updateRegionDto,
          parentId: updateRegionDto.parentId ?? null,
        },
      });

      return { success: true, message: 'Region updated', data: updated };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update',
        error: error.message,
      };
    }
  }

  // ✅ DELETE
  async remove(id: string) {
    try {
      await this.prisma.region.delete({ where: { id } });
      return { success: true, message: 'Region deleted' };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete region',
        error: error.message,
      };
    }
  }
}
