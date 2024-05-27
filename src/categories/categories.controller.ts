import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Obtener todas las categorías
  @Get()
  async findAllCategories(): Promise<CategoryDto[]> {
    return await this.categoriesService.findAllCategories();
  }

  // Obtener la cantidad de productos en todas las categorías
  @Get('count-products')
  async findAllCategoriesCountProduct() {
    return await this.categoriesService.findAllCategoriesCountProduct();
  }

  // Obtener productos por una categoría específica
  @Get(':category')
  async findByName(@Param('category') category: string) {
    return await this.categoriesService.findByName(category);
  }

  // Obtener la cantidad de productos por nombre de categoría
  @Get(':category/count-product')
  async findByCategoryCountProduct(@Param('category') category: string) {
    return await this.categoriesService.findByCategoryCountProduct(category);
  }
}
