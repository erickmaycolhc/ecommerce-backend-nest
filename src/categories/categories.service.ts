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
    const list = await this.dataSource.query(`SELECT * FROM categories`);
    console.log({ list });
    return list;
  }

  async findByName(categoryName: string) {
    const product = await this.dataSource.query(
      `SELECT 
        products.id,
        products.url,
        products.precio,
        products.descripcion,
        images.imagen,
        categories.nombre
      FROM 
        products 
      JOIN 
        categories ON products.id_categorias = categories.id
      LEFT JOIN 
        images ON products.id = images.id_producto
      WHERE 
        categories.url = ?`,
      [categoryName],
    );
    console.log('product 22222222 ===> ', product);
    return product;
  }
}
