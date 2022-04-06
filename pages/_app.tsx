import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import "@reach/dialog/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const toastOptions = {
    backgroundColor: "red",
    color: "white",
    minWidth: "150px",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  };
  return (
    <>
      <main>
        <GlobalStyles />
        <Toaster
          toastOptions={{
            style: toastOptions,
          }}
        />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
