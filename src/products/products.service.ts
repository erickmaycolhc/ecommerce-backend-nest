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
    const resultQuery = await this.dataSource.query(
      `SELECT 
      ecommerce_products.id,
      ecommerce_products.name,
          ecommerce_categories.name 'category_name',
              ecommerce_categories.url 'category_url',
              ecommerce_products.price,
              ecommerce_products.description,
              ecommerce_products.date_registered,
              ecommerce_products.url
      FROM ecommerce_products
      INNER JOIN ecommerce_categories ON ecommerce_categories.id = ecommerce_products.id_category
      where ecommerce_products.id = 1
      `,
    );

    let productsFinally: ProductDto[] = await Promise.all(
      resultQuery.map(async (item) => {
        const images = await this.findImages(item.id);
        images.map((itemImage) => {
          return {
            url: itemImage.image,
          };
        });

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

    console.log('productsFinally=>>', productsFinally);
    return productsFinally;
  }

  async findImages(id: string) {
    const images = await this.dataSource.query(
      `SELECT image FROM ecommerce_images where ecommerce_images.id_product = ?`,
      [id],
    );
    return images;
  }

  async findByIdProduct(id: string) {
    const resultQuery = await this.dataSource.query(
      `SELECT 
      ecommerce_products.id,
      ecommerce_products.name,
          ecommerce_categories.name 'category_name',
              ecommerce_categories.url 'category_url',
              ecommerce_products.price,
              ecommerce_products.description,
              ecommerce_products.date_registered,
              ecommerce_products.url
      FROM ecommerce_products
      INNER JOIN ecommerce_categories ON ecommerce_categories.id = ecommerce_products.id_category
      where ecommerce_products.id = ?
      `,
      [id],
    );

    let productsFinally: ProductDto[] = await Promise.all(
      resultQuery.map(async (item) => {
        const images = await this.findImages(item.id);
        images.map((itemImage) => {
          return {
            url: itemImage.image,
          };
        });

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

    console.log('productsFinally=>>', productsFinally);
    return productsFinally;
  }
}
