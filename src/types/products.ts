export type Image = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: Image;
  stock?: number;
};
