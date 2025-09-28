import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}


  async create(createSellerDto: CreateSellerDto) {
    return this.prisma.seller.create({
      data: {
        userId: createSellerDto.userId,
        regionId: createSellerDto.regionId,
        shopName: createSellerDto.shopName,
      },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async findAll() {
    return this.prisma.seller.findMany({
      include: {
        user: true,
        region: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.seller.findUnique({
      where: { id },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    return this.prisma.seller.update({
      where: { id },
      data: {
        regionId: updateSellerDto.regionId,
        shopName: updateSellerDto.shopName,
      },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.seller.delete({
      where: { id },
    });
  }
}
