import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async createTransaction(dto: CreateTransactionDto, userId: string) {
    if (dto.categoryId) {
      const category = await this.prisma.transactionCategory.findFirst({
        where: {
          id: dto.categoryId,
          userId: userId,
        },
      });

      if (!category) {
        throw new BadRequestException(
          'Category not found or does not belong to user',
        );
      }
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        userId: userId,
        name: dto.name,
        amount: dto.amount,
        type: dto.type,
        description: dto.description,
        currency: dto.currency,
        categoryId: dto.categoryId,
        date: dto.date ? new Date(dto.date) : new Date(),
      },
    });
    if (!transaction) {
      throw new BadRequestException('Could not create transaction');
    }
    return transaction;
  }

  async getUserTransactions(userId: string) {
    return await this.prisma.transaction.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMoneySpend(userId: string) {
    const transactions = await this.getUserTransactions(userId);
    const money = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return money;
  }

  async getTransactionById(transactionId: string, userId: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id: transactionId, userId: userId },
    });
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }
    return transaction;
  }

  async updateTransaction(
    dto: UpdateTransactionDto,
    userId: string,
    transactionId: string,
  ) {
    let transaction = await this.getTransactionById(transactionId, userId);
    if (!transaction) {
      throw new BadRequestException('Transaction does not exist');
    }
    const { category, ...updateData } = dto;
    transaction = await this.prisma.transaction.update({
      where: { id: transactionId },
      data: updateData,
    });
    return transaction;
  }

  async deleteTransaction(userId: string, transactionId: string) {
    if (!transactionId) {
      throw new BadRequestException('Transaction ID is required');
    }

    const transaction = await this.getTransactionById(transactionId, userId);
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction?.userId !== userId) {
      throw new BadRequestException(
        'You do not have permission to delete that',
      );
    }

    return await this.prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  }
}
