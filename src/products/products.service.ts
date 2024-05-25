import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductDto } from './dto/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAllProducts(): Promise<ProductDto[]> {
    const list = await this.dataSource.query(
      `SELECT * FROM ecommerce_products`,
    );
    return list;
  }
}
