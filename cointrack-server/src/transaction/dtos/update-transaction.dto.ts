import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'Amount must be a valid number' })
  amount: number;

  @IsOptional()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  currency: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  category: string;
}
