import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Yangi user yaratish
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        phone: createUserDto.phone,
        password: createUserDto.password,
        fullName: createUserDto.fullName,
        role: createUserDto.role ?? 'USER',
      },
    });
  }

  // Barcha userlarni olish
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        customer: true,
        seller: true,
      },
    });
  }

  // ID bo‘yicha userni olish
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        customer: true,
        seller: true,
      },
    });
  }

  // Userni yangilash
  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        phone: updateUserDto.phone,
        password: updateUserDto.password,
        fullName: updateUserDto.fullName,
        role: updateUserDto.role,
      },
    });
  }

  // Userni o‘chirish
  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
