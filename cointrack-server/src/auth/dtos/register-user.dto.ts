import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString({
    message: 'Password is required',
  })
  password: string;

  @IsNumber()
  income: number;

  @IsNumber()
  amount: number;
}
