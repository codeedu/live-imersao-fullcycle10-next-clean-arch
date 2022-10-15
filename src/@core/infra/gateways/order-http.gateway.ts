import { AxiosInstance } from "axios";
import { Order } from "../../domain/entities/order";
import { Product } from "../../domain/entities/product";
import { OrderGateway } from "../../domain/gateways/order.gateway";

export class OrderHttpGateway implements OrderGateway {
  constructor(private readonly http: AxiosInstance) {}

  insert(order: Order): Promise<Order> {
    return this.http.post("/orders", order.toJSON()).then((response) => {
      order.props.id = response.data.id;
      return order;
    });
  }

  findById(id: number): Promise<Order> {
    return this.http.get(`/orders/${id}`).then(
      (response) =>
        new Order({
          id: response.data.id,
          products: response.data.products.map(
            (product: any) =>
              new Product({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
              })
          ),
          credit_card_number: response.data.credit_card_number,
        })
    );
  }
}
