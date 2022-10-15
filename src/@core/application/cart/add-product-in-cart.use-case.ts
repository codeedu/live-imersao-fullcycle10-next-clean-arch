import { Cart } from "../../domain/entities/cart";
import { Product } from "../../domain/entities/product";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class AddProductInCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  execute(product: Product): Cart {
    const cart = this.cartGateway.get();
    cart.addProduct(product);
    this.cartGateway.save(cart);
    return cart;
  }
}
