import { useEffect } from "react";
import type { ReactNode } from "react";
import { providers } from "ethers";
import { Provider } from "wagmi";
import type { AppLayoutProps } from "next/app";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "../styles/variables/breakpoints.css";
import "../styles/variables/colors.css";
import "../styles/variables/typography.css";
import "../styles/variables/spacing.css";
import "../styles/variables/z-index.css";
import "../styles/reset.css";
import "../styles/base.css";
import "../styles/display.css";
import "../styles/layout.css";
import "../styles/vendors/tippy.css";
import "../styles/vendors/reach.css";

// import "../components/RichMarkdownEditor/all.css";
import "remirror/styles/all.css";

import { Layout, Toast, ClientUpdater } from "~/components";
import { GlobalStyles } from "~/components/GlobalStyles";
import { injectedConnector, walletConnectConnector } from "~/utils";

import * as analytics from "~/utils/analytics";

const connectors = ({ chainId }: { chainId?: any }) => {
  return [injectedConnector, walletConnectConnector];
};

const provider = ({ chainId }: { chainId?: any }) =>
  new providers.AlchemyProvider(
    chainId,
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );

const webSocketProvider = ({ chainId }: { chainId?: any }) =>
  new providers.AlchemyWebSocketProvider(
    chainId,
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_API_URL,
  cache: new InMemoryCache(),
});

function LogbookApp({ Component, pageProps }: AppLayoutProps) {
  const defaultLayout = (page: ReactNode) => <Layout>{page}</Layout>;
  const getLayout = Component.getLayout ?? defaultLayout;

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      analytics.pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <ApolloProvider client={client}>
        <Toast.Container />
        {getLayout(<Component {...pageProps} />)}
        <GlobalStyles />
        <ClientUpdater />
      </ApolloProvider>
    </Provider>
  );
}

export default LogbookApp;
