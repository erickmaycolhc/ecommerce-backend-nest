import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllProducts(): Promise<ProductDto[]> {
    return this.productsService.findAllProducts();
  }

  @Get('category/:urlCategory')
  findByUrlCategory(@Param('urlCategory') urlCategory: string) {
    return this.productsService.findByUrlCategory(urlCategory);
  }

  @Get(':url')
  findByUrlProduct(@Param('url') url: string) {
    console.log('url =>>', url);
    return this.productsService.findByUrlProduct(url);
  }
}
