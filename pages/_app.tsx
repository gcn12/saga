import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}</style>
        <GlobalStyles />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
