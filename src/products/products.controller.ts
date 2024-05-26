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

  @Get(':id')
  findByIdProduct(@Param('id') id: string) {
    return this.productsService.findByIdProduct(id);
  }
}
