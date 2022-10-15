import { Product } from "./product";

export type CartProps = {
  products: Product[];
};

export class Cart {
  constructor(public props: CartProps) {}

  addProduct(product: Product) {
    this.props.products.push(product);
  }

  removeProduct(productId: number) {
    this.props.products = this.props.products.filter(
      (product) => product.id !== productId
    );
  }

  clear() {
    this.props.products = [];
  }

  get total() {
    return this.props.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  get products() {
    return this.props.products;
  }
}
