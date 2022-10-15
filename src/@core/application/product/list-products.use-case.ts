import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ListProductsUseCase {
  constructor(private productGate: ProductGateway) {}

  async execute(): Promise<Product[]> {
    return this.productGate.findAll();
  }
}
