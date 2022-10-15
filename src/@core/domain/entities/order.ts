import { Product } from "./product";

export type OrderProps = {
  id?: number;
  products: Product[];
  credit_card_number: string;
};

export class Order {
  constructor(public props: OrderProps) {}

  get id() {
    return this.props.id;
  }

  get products() {
    return this.props.products;
  }

  get credit_card_number() {
    return this.props.credit_card_number;
  }

  get total() {
    return this.props.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }

  toJSON() {
    return {
      id: this.id,
      products: this.products.map((product) => product.toJSON()),
      credit_card_number: this.credit_card_number,
    };
  }
}
