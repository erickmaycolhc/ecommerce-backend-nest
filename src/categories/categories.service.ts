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
    console.log('liss =>>>', list);
    return list;
  }

  async findByName(categoryName: string) {
    const product = await this.dataSource.query(
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
      ecommerce_images ON ecommerce_products.id = ecommerce_images.id_producto
      
   where  ecommerce_categories.url = ?`,
      [categoryName],
    );
    console.log('product 22222222 ===> ', product);
    return product;
  }
}
