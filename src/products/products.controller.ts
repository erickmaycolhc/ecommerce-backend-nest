import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // todos los productos
  @Get()
  findAllProducts(): Promise<ProductDto[]> {
    try {
      return this.productsService.findAllProducts();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Could not fetch Products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //todos los productos de una categoria
  @Get('category/:urlCategory')
  findByUrlCategory(
    @Param('urlCategory') urlCategory: string,
  ): Promise<ProductDto[]> {
    try {
      return this.productsService.findByUrlCategory(urlCategory);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Could not fetch Products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //por producto
  @Get(':url')
  findByUrlProduct(@Param('url') url: string): Promise<ProductDto> {
    try {
      return this.productsService.findByUrlProduct(url);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Could not fetch Product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
