import type { ReactNode } from "react";

import { Polygon, Mumbai, DAppProvider, Config } from "@usedapp/core";
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

import { Layout } from "~/components";
import { GlobalStyles } from "~/components/GlobalStyles";

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === "production";

const config: Config = {
  readOnlyChainId: isProd ? Polygon.chainId : Mumbai.chainId,
  readOnlyUrls: {
    [Polygon.chainId]: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_URL || "",
    [Mumbai.chainId]: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_URL || "",
  },
  networks: [isProd ? Polygon : Mumbai],
};

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_THE_GRAPH_API_URL,
  cache: new InMemoryCache(),
});

function LogbookApp({ Component, pageProps }: AppLayoutProps) {
  const defaultLayout = (page: ReactNode) => <Layout>{page}</Layout>;
  const getLayout = Component.getLayout ?? defaultLayout;

  return (
    <DAppProvider config={config}>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
        <GlobalStyles />
      </ApolloProvider>
    </DAppProvider>
  );
}

export default LogbookApp;
