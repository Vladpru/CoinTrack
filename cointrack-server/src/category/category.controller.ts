import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUserId } from './decorators/current-user.decorator';
import { AccessTokenGuard } from '../auth/guards/access-jwt.guard';

@UseGuards(AccessTokenGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @CurrentUserId() userId: string,
  ) {
    return this.categoryService.createCategory(dto, userId);
  }

  @Get('get-all')
  async getUserCategories(@CurrentUserId() userId: string) {
    const categories = await this.categoryService.getUserCategories(userId);
    return { categories };
  }

  @Get('stats')
  async getCategoryUsageStats(@CurrentUserId() userId: string) {
    return this.categoryService.getCategoryUsageStats(userId);
  }

  @Get('get/:id')
  async getCategoryById(
    @Param('id') categoryId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.categoryService.getCategoryById(categoryId, userId);
  }

  @Patch('update/:id')
  async updateCategory(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
    @CurrentUserId() userId: string,
  ) {
    return this.categoryService.updateCategory(categoryId, dto, userId);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(
    @Param('id') categoryId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.categoryService.deleteCategory(categoryId, userId);
  }

  @Get('top-categories')
  async TopCategories(@CurrentUserId() userId: string) {
    const categories = await this.categoryService.getTopCategories(userId);
    return { categories };
  }
}
