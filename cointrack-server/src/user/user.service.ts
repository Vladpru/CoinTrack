import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import argon2 from 'argon2';
import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: RegisterUserDto) {
    const oldUser = await this.getUserByEmail(dto.email);
    if (oldUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await argon2.hash(dto.password);
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        income: dto.income,
        amount: dto.amount,
      },
    });
  }

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserByEmail(userEmail: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
  }

  async validateUserPassword(hashedPassword: string, password: string) {
    return await argon2.verify(hashedPassword, password);
  }
}
