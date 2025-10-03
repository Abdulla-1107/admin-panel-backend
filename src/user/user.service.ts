import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserQueryDto } from './dto/query.dto';
import { IsUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Telefon raqamni tekshirish
    const checkPhone = await this.prisma.user.findFirst({
      where: { phone_number: createUserDto.phone_number },
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
        phone_number: createUserDto.phone_number,
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
      status,
    } = query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where: any = {};

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

    if (status) {
      where.status = status;
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
    // 1. User bor-yo‘qligini tekshiramiz
    const checkUser = await this.prisma.user.findUnique({ where: { id } });
    if (!checkUser) {
      throw new NotFoundException('User topilmadi');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        phone_number: updateUserDto.phone_number,
        password: updateUserDto.password,
        about: updateUserDto.about,
        photo: updateUserDto.photo,
        status: updateUserDto.status,
        banner_mobile: updateUserDto.banner_mobile,
        banner_desktop: updateUserDto.banner_desktop,
        logo: updateUserDto.logo,
        telegram_username: updateUserDto.telegram_username,
        business_name: updateUserDto.business_name,
        business_type: updateUserDto.business_type,
        business_city: updateUserDto.business_city,
        business_category: updateUserDto.business_category,
        business_website: updateUserDto.business_website,
        passport_file: updateUserDto.passport_file,
        business_certificate_file: updateUserDto.business_certificate_file,
        social_network_account_type: updateUserDto.social_network_account_type,
        social_network_id: updateUserDto.social_network_id,
        updated_at: new Date(), // ✅ avtomatik update time
      },
    });
  }

  async remove(id: string) {
    const checkUser = await this.prisma.user.delete({ where: { id } });
    if (!checkUser) {
      throw new NotFoundException('User topilmadi');
    }

    return { Message: "User o'chirildi" };
  }

  async getUserCount() {
    const totalUsers = await this.prisma.user.count();
    return { totalUsers };
  }
}
