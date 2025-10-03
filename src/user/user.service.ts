import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return;
  }

  async login() {}

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: string) {
    return;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return;
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
