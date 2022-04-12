import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import "@reach/dialog/styles.css";
import { SessionProvider } from "next-auth/react";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
}
