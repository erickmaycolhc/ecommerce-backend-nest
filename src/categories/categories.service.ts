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
      ecommerce_products.id,
      ecommerce_products.name as 'products_name',
      ecommerce_categories.name as 'category_name',
      ecommerce_categories.url as 'category_url',
      ecommerce_images.image as 'url',
      ecommerce_products.price,
      ecommerce_products.description,
      ecommerce_products.date_registered,
      ecommerce_products.state,
      ecommerce_products.url as 'products_url'
    FROM
      ecommerce_products
    INNER JOIN
      ecommerce_categories ON ecommerce_products.id_category = ecommerce_categories.id
    INNER JOIN
      ecommerce_images ON ecommerce_products.id = ecommerce_images.id_product
    where  ecommerce_categories.url = ?`,
      [categoryName],
    );
    console.log('product 22222222 ===> ', product);
    return product;
  }

  async findByCountProductCategory(): Promise<CategoryCountDto[]> {
    const consultaQuery = await this.dataSource.query(`
    SELECT * FROM ecommerce_categories
    `);

    let finallyCantidadProductos = await Promise.all(
      consultaQuery.map(async (item) => {
        const cantidad = await this.counterProductCategory(item.id);

        return {
          id: item.id,
          name: item.name,
          date_registered: item.date_registered,
          state: item.state,
          url: item.url,
          producer_quantity: cantidad, //Number(cantidad) para convertir a number
        };
      }),
    );
    console.log('finallyCantidadProductos=>>', finallyCantidadProductos);
    return finallyCantidadProductos;
  }

  async counterProductCategory(id: number): Promise<number> {
    const result = await this.dataSource.query(
      `
      SELECT COUNT(*) as count FROM ecommerce_products WHERE id_category = ?`,
      [id],
    );
    console.log('cantidadProductos =>', result);
    return result[0].count;
  }
}
