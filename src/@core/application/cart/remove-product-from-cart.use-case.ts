import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class RemoveProductFromCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  execute(productId: number): Cart {
    const cart = this.cartGateway.get();
    cart.removeProduct(productId);
    this.cartGateway.save(cart);
    return cart;
  }
}
