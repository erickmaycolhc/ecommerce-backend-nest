interface CategoryDto {
  id: number;
  nombre: string;
  fecha_de_registro: Date;
  estado: boolean;
  url: string;
}

interface CategoryCountDto {
  id: number;
  nombre: string;
  fecha_de_registro: Date;
  estado: boolean;
  url: string;
  producer_quantity: number;
}
