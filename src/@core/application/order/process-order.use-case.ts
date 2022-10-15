import { Order } from "../../domain/entities/order";
import { Product } from "../../domain/entities/product";
import { CartGateway } from "../../domain/gateways/cart.gateway";
import { OrderGateway } from "../../domain/gateways/order.gateway";

export class ProcessOrderUseCase {
  constructor(private orderGate: OrderGateway, private cartGate: CartGateway) {}

  async execute({
    products,
    credit_card_number,
  }: {
    products: Product[];
    credit_card_number: string;
  }) {
    const order = new Order({
      products,
      credit_card_number,
    });
    const newOrder = await this.orderGate.insert(order);
    const cart = this.cartGate.get();
    cart.clear();
    this.cartGate.save(cart);
    return newOrder;
  }
}
