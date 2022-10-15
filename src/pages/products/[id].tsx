import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useContext } from "react";
import { GetProductUseCase } from "../../@core/application/product/get-product.use-case";
import { Product, ProductProps } from "../../@core/domain/entities/product";
import { container, Registry } from "../../@core/infra/container-registry";
import { CartContext } from "../../context/cart.provider";

type ProductDetailPageProps = {
  product: ProductProps;
};

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
  product,
}) => {
  const productEntity = new Product({...product});
  const cartContext = useContext(CartContext);
  return (
    <div>
      <h3>{productEntity.name}</h3>
      <label>Preço</label> {productEntity.price}
      <button onClick={() => cartContext.addProduct(productEntity)}>
        Adicionar no carrinho
      </button>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params || {};
  const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
  const product = await useCase.execute(+id!);
  return {
    props: {
      product: product.toJSON(),
    },
  };
};
