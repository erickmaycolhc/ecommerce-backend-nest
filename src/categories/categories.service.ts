import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAllCategories(): Promise<CategoryDto[]> {
    try {
      const list = await this.dataSource.query(
        `SELECT * FROM ecommerce_categories`,
      );

      if (!list.length) {
        throw new HttpException('No categories found', HttpStatus.NOT_FOUND);
      }

      return list;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error fetching categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  ////
  async findByName(category: string): Promise<CategoryDto> {
    try {
      const product = await this.dataSource.query(
        `SELECT * FROM ecommerce_categories WHERE ecommerce_categories.url = ?`,
        [category],
      );

      if (!product.length) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      return product[0];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error fetching category: ${category}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllCategoriesCountProduct(): Promise<CategoryCountDto[]> {
    try {
      const consultaQuery = await this.dataSource.query(`
      SELECT * FROM ecommerce_categories
      `);

      if (!consultaQuery.length) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
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
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async counterProductCategory(id: number): Promise<number> {
    try {
      const result = await this.dataSource.query(
        `
        SELECT COUNT(*) as count FROM ecommerce_products WHERE id_category = ?`,
        [id],
      );

      if (!result.length) {
        return 0;
      }
      return result[0].count;
    } catch (error) {
      console.error('Error fetching product count for category:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching product count for category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCategoryCountProduct(
    category: string,
  ): Promise<CategoryCountDto> {
    try {
      const consultaQuery = await this.dataSource.query(
        `
          SELECT * FROM ecommerce_categories where ecommerce_categories.url = ?
        `,
        [category],
      );

      // Suponiendo que consultaQuery siempre devuelve al menos un resultado
      //Promise.all siempre retorna un array, aunque la consulta de la base de datos retorne un solo elemento.
      if (!consultaQuery.length) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      //se obtiene el primer elemento de consultaQuery
      const item = consultaQuery[0];
      const cantidad = await this.counterProductCategory(item.id);

      const result: CategoryCountDto = {
        id: item.id,
        nombre: item.name,
        fecha_de_registro: item.date_registered,
        estado: item.state,
        url: item.url,
        producer_quantity: Number(cantidad), //Number(cantidad) para convertir a number
      };

      return result;
    } catch (error) {
      console.log('Error fetching categories', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching category',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
