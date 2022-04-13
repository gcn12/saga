import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "../styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import "@reach/dialog/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
// import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function App({
  Component,
  // pageProps: { session, ...pageProps },
  pageProps: { ...pageProps },
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
        {/* <SessionProvider session={session}> */}
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <Component {...pageProps} />
          {/* </SessionProvider> */}
        </QueryClientProvider>
      </main>
    </>
  );
}
