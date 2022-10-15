import { Cart } from "../entities/cart";

export interface CartGateway {
  get(): Cart;
  save(cart: Cart): void;
}
