export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Order = {
  id: number;
  products: Product[];
  credit_card_number: string;
};
