import { Order } from "../../domain/entities/order";
import { OrderGateway } from "../../domain/gateways/order.gateway";

export class GetOrderUseCase {
  constructor(private orderGate: OrderGateway) {}

  async execute(id: number): Promise<Order> {
    return this.orderGate.findById(id);
  }
}
