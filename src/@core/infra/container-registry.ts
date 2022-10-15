import "reflect-metadata";
import { Container } from "inversify";
import { AddProductInCartUseCase } from "../application/cart/add-product-in-cart.use-case";
import { ClearCartUseCase } from "../application/cart/clear-cart.use-case";
import { GetCartUseCase } from "../application/cart/get-cart.use-case";
import { RemoveProductFromCartUseCase } from "../application/cart/remove-product-from-cart.use-case";
import { GetProductUseCase } from "../application/product/get-product.use-case";
import { ListProductsUseCase } from "../application/product/list-products.use-case";
import { CartLocalStorageGateway } from "./gateways/cart-local-storage.gateway";
import { ProductHttpGateway } from "./gateways/product-http.gateway";
import { http } from "./http";
import { ProcessOrderUseCase } from "../application/order/process-order.use-case";
import { OrderHttpGateway } from "./gateways/order-http.gateway";
import { OrderGateway } from "../domain/gateways/order.gateway";
import { GetOrderUseCase } from "../application/order/get-order.use-case";

export const Registry = {
  AxiosAdapter: Symbol.for("AxiosAdapter"),

  ProductGateway: Symbol.for("ProductGateway"),
  CartGateway: Symbol.for("CartGateway"),
  OrderGateway: Symbol.for("OrderGateway"),

  ListProductsUseCase: Symbol.for("ListProductsUseCase"),
  GetProductUseCase: Symbol.for("GetProductUseCase"),

  GetCartUseCase: Symbol.for("GetCartUseCase"),
  AddProductInCartUseCase: Symbol.for("AddProductInCartUseCase"),
  RemoveProductFromCartUseCase: Symbol.for("RemoveProductFromCartUseCase"),
  ClearCartUseCase: Symbol.for("ClearCartUseCase"),

  GetOrderUseCase: Symbol.for("GetOrderUseCase"),
  ProcessOrderUseCase: Symbol.for("ProcessOrderUseCase"),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);

//########## GATEWAYS
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
  return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter));
});
container.bind(Registry.CartGateway).to(CartLocalStorageGateway);
container.bind(Registry.OrderGateway).toDynamicValue((context) => {
  return new OrderHttpGateway(context.container.get(Registry.AxiosAdapter));
});

//########## USE CASES
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
  return new ListProductsUseCase(
    context.container.get(Registry.ProductGateway)
  );
});

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
  return new GetProductUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
  return new GetCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
  return new AddProductInCartUseCase(
    context.container.get(Registry.CartGateway)
  );
});

container
  .bind(Registry.RemoveProductFromCartUseCase)
  .toDynamicValue((context) => {
    return new RemoveProductFromCartUseCase(
      context.container.get(Registry.CartGateway)
    );
  });

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
  return new ClearCartUseCase(context.container.get(Registry.CartGateway));
});

container
  .bind(Registry.GetOrderUseCase)
  .toDynamicValue((context) => {
    const orderGate = context.container.get<OrderGateway>(
      Registry.OrderGateway
    );
    return new GetOrderUseCase(orderGate);
  });
container.bind(Registry.ProcessOrderUseCase).toDynamicValue((context) => {
  return new ProcessOrderUseCase(
    context.container.get(Registry.OrderGateway),
    context.container.get(Registry.CartGateway)
  );
});
