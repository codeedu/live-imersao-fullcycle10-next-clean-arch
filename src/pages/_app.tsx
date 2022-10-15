import type { AppProps } from "next/app";
import { MyCart } from "../components/my-cart";
import { CartProvider } from "../context/cart.provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <MyCart />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
