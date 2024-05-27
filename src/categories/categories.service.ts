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
    return list;
  }
  ////
  async findByName(category: string) {
    const product = await this.dataSource.query(
      `SELECT * FROM ecommerce_categories WHERE ecommerce_categories.url = ?`,
      [category],
    );
    return product;
  }

  async findAllCategoriesCountProduct(): Promise<CategoryCountDto[]> {
    const consultaQuery = await this.dataSource.query(`
    SELECT * FROM ecommerce_categories
    `);
    console.log('consultaQuery', consultaQuery);
    let finallyCantidadProductos = await Promise.all(
      consultaQuery.map(async (item) => {
        const cantidad = await this.counterProductCategory(item.id);

        return {
          id: item.id,
          name: item.name,
          date_registered: item.date_registered,
          state: item.state,
          url: item.url,
          producer_quantity: Number(cantidad), //Number(cantidad) para convertir a number
        };
      }),
    );
    return finallyCantidadProductos;
  }

  async counterProductCategory(id: number): Promise<number> {
    const result = await this.dataSource.query(
      `
      SELECT COUNT(*) as count FROM ecommerce_products WHERE id_category = ?`,
      [id],
    );
    return result[0].count;
  }

  async findByCategoryCountProduct(
    category: string,
  ): Promise<CategoryCountDto[]> {
    const consultaQuery = await this.dataSource.query(
      `
    SELECT * FROM ecommerce_categories where ecommerce_categories.url = ?
    `,
      [category],
    );
    let finallyCantidadProductos = await Promise.all(
      consultaQuery.map(async (item) => {
        const cantidad = await this.counterProductCategory(item.id);

        return {
          id: item.id,
          name: item.name,
          date_registered: item.date_registered,
          state: item.state,
          url: item.url,
          producer_quantity: Number(cantidad), //Number(cantidad) para convertir a number
        };
      }),
    );
    return finallyCantidadProductos;
  }
}
