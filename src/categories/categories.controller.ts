import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAllCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.findAllCategories();
  }

  // @Get(':categoryName')
  // async findByName(@Param('categoryName') categoryName: string) {
  //   console.log({ categoryName });
  //   const products = await this.categoriesService.findByName(categoryName);
  //   console.log({ products });
  //   return products;
  // }
  @Get(':categoryName')
  async findByName(@Param('categoryName') categoryName: string) {
    console.log('categoryName ==> ', categoryName);
    const products = await this.categoriesService.findByName(categoryName);
    console.log({ products });
    return products;
    //return null;
  }
}