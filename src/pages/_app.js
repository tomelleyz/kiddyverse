import "@/styles/globals.css";
import { bind } from "cuelume";

bind();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
