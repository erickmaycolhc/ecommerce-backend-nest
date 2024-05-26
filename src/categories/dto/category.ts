interface CategoryDto {
  id: number;
  nombre: string;
  url: string;
  fecha_de_registro: Date;
  estado: boolean;
}

interface CategoryCountDto {
  id: number;
  nombre: string;
  url: string;
  fecha_de_registro: Date;
  estado: boolean;
  producer_quantity: number;
}
