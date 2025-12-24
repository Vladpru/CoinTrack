import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100, { message: 'Category name must not exceed 100 characters' })
  name: string;

  @IsString()
  emoji: string;

  @IsString()
  color: string;
}
