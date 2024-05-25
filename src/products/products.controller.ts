import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllProducts(): Promise<ProductDto[]> {
    return this.productsService.findAllProducts();
  }
}
