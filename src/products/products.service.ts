import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Image, ProductDto } from './dto/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findAllProducts(): Promise<ProductDto[]> {
    try {
      const resultQuery = await this.dataSource.query(
        `SELECT 
        ecommerce_products.id,
        ecommerce_products.name,
            ecommerce_categories.name AS  'category_name',
                ecommerce_categories.url AS 'category_url',
                ecommerce_products.price,
                ecommerce_products.description,
                ecommerce_products.date_registered,
                ecommerce_products.url
        FROM ecommerce_products
        INNER JOIN ecommerce_categories ON ecommerce_categories.id = ecommerce_products.id_category
        `,
      );

      if (!resultQuery.length) {
        throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
      }

      let productsFinally: ProductDto[] = await Promise.all(
        resultQuery.map(async (item) => {
          const images = await this.findImages(item.id);

          return {
            id: item.id,
            name: item.name,
            category: {
              name: item.category_name,
              url: item.category_url,
            },
            images: images,
            price: item.price,
            description: item.description,
            date_registered: item.date_registered,
            url: item.url,
          };
        }),
      );

      return productsFinally;
    } catch (error) {
      console.log('Error fetching products', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findImages(id: string): Promise<Image[]> {
    try {
      const images = await this.dataSource.query(
        `SELECT image FROM ecommerce_images WHERE id_product = ?`,
        [id],
      );

      if (!images.length) {
        throw new HttpException('Images not found', HttpStatus.NOT_FOUND);
      }
      return images.map((image) => ({ url: image.image }));
    } catch (error) {
      console.error('Error fetching images:', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching images',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUrlCategory(urlCategory: string): Promise<ProductDto[]> {
    try {
      const resultQuery = await this.dataSource.query(
        `SELECT 
        ecommerce_products.id,
        ecommerce_products.name,
            ecommerce_categories.name AS'category_name',
                ecommerce_categories.url AS 'category_url',
                ecommerce_products.price,
                ecommerce_products.description,
                ecommerce_products.date_registered,
                ecommerce_products.url
        FROM ecommerce_products
        INNER JOIN ecommerce_categories ON ecommerce_categories.id = ecommerce_products.id_category
        where ecommerce_categories.url = ?
        `,
        [urlCategory],
      );

      if (!resultQuery.length) {
        throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
      }

      let productsFinally: ProductDto[] = await Promise.all(
        resultQuery.map(async (item) => {
          const images = await this.findImages(item.id);

          return {
            id: item.id,
            name: item.name,
            category: {
              name: item.category_name,
              url: item.category_url,
            },
            images: images,
            price: item.price,
            description: item.description,
            date_registered: item.date_registered,
            url: item.url,
          };
        }),
      );
      return productsFinally;
    } catch (error) {
      console.log('Error fetching products', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUrlProduct(url: string): Promise<ProductDto> {
    try {
      const resultQuery = await this.dataSource.query(
        `SELECT 
          ecommerce_products.id,
          ecommerce_products.name,
          ecommerce_categories.name AS category_name,
          ecommerce_categories.url AS category_url,
          ecommerce_products.price,
          ecommerce_products.description,
          ecommerce_products.date_registered,
          ecommerce_products.state,
          ecommerce_products.url
        FROM ecommerce_products
        INNER JOIN ecommerce_categories ON ecommerce_categories.id = ecommerce_products.id_category
        WHERE ecommerce_products.url = ?
        `,
        [url],
      );

      if (!resultQuery.length) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Obtenga el primer (y único) elemento de resultQuery
      const item = resultQuery[0];
      // Obtener imágenes relacionadas con el producto.
      const images = await this.findImages(item.id);

      // Crear el objeto JSON de resultado
      const resultJson: ProductDto = {
        id: item.id,
        name: item.name,
        category: {
          name: item.category_name,
          url: item.category_url,
        },
        images: images,
        price: item.price,
        description: item.description,
        date_registered: item.date_registered,
        state: item.state,
        url: item.url,
      };

      return resultJson;
    } catch (error) {
      console.log('Error fetching product', error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error fetching product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
