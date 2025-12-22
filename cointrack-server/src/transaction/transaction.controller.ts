import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AccessTokenGuard } from 'src/auth/guards/access-jwt.guard';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { CurrentUserId } from './decorators/user-id.decorator';
import { UpdateTransactionDto } from './dtos/update-transaction.dto';

@UseGuards(AccessTokenGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('')
  async createTransaction(
    @Body() dto: CreateTransactionDto,
    @CurrentUserId() userId: string,
  ) {
    return this.transactionService.createTransaction(dto, userId);
  }

  @Patch('update/:transactionId')
  async updateTransaction(
    @Body() dto: UpdateTransactionDto,
    @Param('transactionId') transactionId,
    @CurrentUserId() userId: string,
  ) {
    return this.transactionService.updateTransaction(
      dto,
      userId,
      transactionId,
    );
  }

  @Delete('delete/:transactionId')
  async deleteTransaction(
    @Param('transactionId') transactionId,
    @CurrentUserId() userId: string,
  ) {
    return this.transactionService.deleteTransaction(userId, transactionId);
  }

  @Get('')
  async getUserTransactions(@CurrentUserId() userId: string) {
    return this.transactionService.getUserTransactions(userId);
  }

  @Get('get/:transactionId')
  async getTransactionById(
    @Param('transactionId') transactionId,
    @CurrentUserId() userId: string,
  ) {
    return this.transactionService.getTransactionById(transactionId, userId);
  }

  @Get('by-category/:categoryId')
  async getTransactionsByCategory(
    @Param('categoryId') categoryId: string,
    @CurrentUserId() userId: string,
  ) {
    // return this.transactionService.getTransactionsByCategory(categoryId, userId);
  }

  @Get('money-spend')
  async getMoneySpend(@CurrentUserId() userId: string) {
    const money = this.transactionService.getMoneySpend(userId);
    return { money };
  }
}
