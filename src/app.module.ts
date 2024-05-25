import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_MYSQL_HOST,
      port: +process.env.DB_MYSQL_PORT,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD,
      database: process.env.DB_MYSQL_NAME_DB,
      autoLoadEntities: false,
      synchronize: false,
    }),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
