import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
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
      `SELECT 
      ecommerce_products.nombre_del_producto as 'products_name',
      ecommerce_categories.nombre as 'category_name',
      ecommerce_categories.url as 'category_url',
      ecommerce_images.imagen as 'url',
    ecommerce_products.precio,
      ecommerce_products.descripcion,
      ecommerce_products.fecha_de_registro,
      ecommerce_products.estado,
      ecommerce_products.url as 'products_url'
  FROM 
      ecommerce_products
  INNER JOIN 
      ecommerce_categories ON ecommerce_products.id_categorias = ecommerce_categories.id
  INNER JOIN 
      ecommerce_images ON ecommerce_products.id = ecommerce_images.id_producto`,
    );
    console.log({ list });
    return list;
  }
}
