import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto, userId: string) {
    const existingCategory = await this.prisma.transactionCategory.findFirst({
      where: {
        name: dto.name,
        userId: userId,
      },
    });

    if (existingCategory) {
      throw new BadRequestException('Category with this name already exists');
    }

    return await this.prisma.transactionCategory.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId: userId,
      },
    });
  }

  async getUserCategories(userId: string) {
    return await this.prisma.transactionCategory.findMany({
      where: { userId: userId },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getCategoryById(categoryId: string, userId: string) {
    const category = await this.prisma.transactionCategory.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(
    categoryId: string,
    dto: UpdateCategoryDto,
    userId: string,
  ) {
    await this.getCategoryById(categoryId, userId);

    if (dto.name) {
      const existingCategory = await this.prisma.transactionCategory.findFirst({
        where: {
          name: dto.name,
          userId: userId,
          NOT: {
            id: categoryId,
          },
        },
      });

      if (existingCategory) {
        throw new BadRequestException('Category with this name already exists');
      }
    }

    return await this.prisma.transactionCategory.update({
      where: { id: categoryId },
      data: dto,
    });
  }

  async deleteCategory(categoryId: string, userId: string) {
    const category = await this.getCategoryById(categoryId, userId);

    const transactionCount = await this.prisma.transaction.count({
      where: { categoryId: categoryId },
    });

    if (transactionCount > 0) {
      throw new BadRequestException(
        `Cannot delete category. It has ${transactionCount} associated transactions. Please reassign or delete the transactions first.`,
      );
    }

    return await this.prisma.transactionCategory.delete({
      where: { id: categoryId },
    });
  }

  async getCategoryUsageStats(userId: string) {
    return await this.prisma.transactionCategory.findMany({
      where: { userId: userId },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            transactions: true,
          },
        },
        transactions: {
          select: {
            amount: true,
            type: true,
          },
        },
      },
    });
  }
}
