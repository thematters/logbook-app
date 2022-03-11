import type { ReactNode } from "react";
import { providers } from "ethers";
import { Provider } from "wagmi";
import type { AppLayoutProps } from "next/app";
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

import { Layout } from "~/components";
import { GlobalStyles } from "~/components/GlobalStyles";
import { injectedConnector, walletConnectConnector } from "~/utils";

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

  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
        <GlobalStyles />
      </ApolloProvider>
    </Provider>
  );
}

export default LogbookApp;
