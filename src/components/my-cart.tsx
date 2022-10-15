import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/cart.provider";
type Props = {};
export const MyCart = (props: Props) => {
  const cartContext = useContext(CartContext);
  return (
    <nav>
      Cart - Total {cartContext.cart.total} | Items{" "}
      {cartContext.cart.products.length} |{" "}
      <Link href="/checkout" passHref>
        <a href="">Finalizar compra</a>
      </Link>
    </nav>
  );
};
