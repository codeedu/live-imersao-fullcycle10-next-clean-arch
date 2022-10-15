import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { GetOrderUseCase } from "../../../@core/application/order/get-order.use-case";
import { container, Registry } from "../../../@core/infra/container-registry";
import { Order } from "../../../utils/models";
type CheckoutSuccessPageProps = {
  order: Order;
};
export const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({
  order,
}) => {
  return (
    <div>
      <h3>Parabéns sua compra ID foi efetivada</h3>
      <ul>
        {order.products.map((item) => (
          <li key={item.id}>
            Produto {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutSuccessPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const getOrderUseCase = container.get<GetOrderUseCase>(
    Registry.GetOrderUseCase
  );
  const order = await getOrderUseCase.execute(+id!);

  return {
    props: {
      order: order.toJSON(),
    },
  };
};
