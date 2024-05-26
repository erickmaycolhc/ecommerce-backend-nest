export interface ProductDto {
  id: number;
  name: string;
  category: Category;
  images: Image[];
  price: string;
  description: string;
  date_registered: Date;
  state: Boolean;
  url: string;
}

export interface Category {
  name: string;
  url: string;
}

export interface Image {
  url: string;
}
