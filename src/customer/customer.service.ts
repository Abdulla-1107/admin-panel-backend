import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        userId: createCustomerDto.userId,
        regionId: createCustomerDto.regionId,
        address: createCustomerDto.address,
      },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: {
        user: true,
        region: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: {
        regionId: updateCustomerDto.regionId,
        address: updateCustomerDto.address,
      },
      include: {
        user: true,
        region: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
