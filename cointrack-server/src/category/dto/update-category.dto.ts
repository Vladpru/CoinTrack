import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Category name must not exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  emoji: string;

  @IsOptional()
  @IsString()
  color: string;
}
