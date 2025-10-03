import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserQueryDto } from './dto/query.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Telefon raqamni tekshirish
    const checkPhone = await this.prisma.user.findFirst({
      where: { phone_number: createUserDto.phone },
    });
    if (checkPhone) {
      throw new BadRequestException('Ushbu telefon raqam foydalanilgan');
    }

    // Emailni tekshirish
    const checkEmail = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (checkEmail) {
      throw new BadRequestException('Ushbu email foydalanilgan');
    }

    // Parolni hash qilish
    const newPassword = await bcrypt.hash(createUserDto.password, 10);

    // Yangi user yaratish
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        phone_number: createUserDto.phone,
        email: createUserDto.email,
        password: newPassword,
        role: createUserDto.role,
        is_verified: createUserDto.is_verified ?? false,
      },
    });

    // Parolsiz qaytarish
    const { password, ...result } = newUser;
    return result;
  }

  async login(loginUserDto: LoginUserDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: { email: loginUserDto.email },
    });
    if (!checkUser) {
      throw new NotFoundException('Emailga tegishli user topilmadi');
    }
    const checkPassword = await bcrypt.compare(
      loginUserDto.password,
      checkUser.password!,
    );

    if (!checkPassword) {
      throw new UnauthorizedException('Parol noto‘g‘ri');
    }

    const payload = { id: checkUser.id, role: checkUser.role };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async findAll(query: UserQueryDto) {
    const {
      page = '1',
      limit = '10',
      sortBy = 'created_at',
      order = 'desc',
      search,
      role,
    } = query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where: any = {};

    // 🔍 Search faqat name va phone_number bo‘yicha
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone_number: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 🎭 Filter by role
    if (role) {
      where.role = role;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    };
  }

  async findOne(id: string) {
    const checkUser = await this.prisma.user.findFirst({ where: { id } });
    if (!checkUser) {
      throw new NotFoundException('User topilmadi');
    }
    return { data: checkUser };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return;
  }

  async remove(id: string) {
    const checkUser = await this.prisma.user.delete({ where: { id } });
    if (!checkUser) {
      throw new NotFoundException('User topilmadi');
    }

    return { Message: "User o'chirildi" };
  }
}
