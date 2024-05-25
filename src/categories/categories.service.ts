import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAllCategories(): Promise<CategoryDto[]> {
    const list = await this.dataSource.query(
      `SELECT * FROM ecommerce_categories`,
    );
    console.log({ list });
    return list;
  }

  async findByName(categoryName: string) {
    const product = await this.dataSource.query(
      `SELECT 
      ecommerce_products.id,
      ecommerce_products.url,
      ecommerce_products.precio,
      ecommerce_products.descripcion,
      ecommerce_images.imagen,
      ecommerce_categories.nombre
    FROM 
      ecommerce_products 
    JOIN 
      ecommerce_categories ON ecommerce_products.id_categorias = ecommerce_categories.id
    LEFT JOIN 
      ecommerce_images ON ecommerce_products.id = ecommerce_images.id_producto
    WHERE 
      ecommerce_categories.url = '?`,
      [categoryName],
    );
    console.log('product 22222222 ===> ', product);
    return product;
  }
}
