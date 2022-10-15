import { Cart } from "../../domain/entities/cart";
import { CartGateway } from "../../domain/gateways/cart.gateway";

export class GetCartUseCase {
  constructor(private cartGateway: CartGateway) {}

  execute(): Cart {
    return this.cartGateway.get();
  }
}
