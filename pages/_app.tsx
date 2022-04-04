import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        {/* <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
          }
        `}</style> */}
        <GlobalStyles />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "red",
              color: "white",
              minWidth: "150px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            },
          }}
        />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
