import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Obtener todas las categorías
  @Get()
  async findAllCategories(): Promise<CategoryDto[]> {
    try {
      return await this.categoriesService.findAllCategories();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not fetch categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener la cantidad de productos en todas las categorías
  @Get('count-products')
  async findAllCategoriesCountProduct(): Promise<CategoryCountDto[]> {
    try {
      return await this.categoriesService.findAllCategoriesCountProduct();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not fetch categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener productos por una categoría específica
  @Get(':category')
  async findByName(@Param('category') category: string): Promise<CategoryDto> {
    try {
      return await this.categoriesService.findByName(category);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Could not fetch category: ${category}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener la cantidad de productos por nombre de categoría
  @Get(':category/count-product')
  async findByCategoryCountProduct(
    @Param('category') category: string,
  ): Promise<CategoryCountDto> {
    try {
      return await this.categoriesService.findByCategoryCountProduct(category);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Could not fetch categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
