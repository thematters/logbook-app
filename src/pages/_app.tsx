import { Polygon, Mumbai, DAppProvider, Config } from "@usedapp/core";
import type { AppLayoutProps } from "next/app";

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

function LogbookApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout;

  if (getLayout) {
    return (
      <DAppProvider config={config}>
        {getLayout(<Component {...pageProps} />)}
        <GlobalStyles />
      </DAppProvider>
    );
  }

  return (
    <DAppProvider config={config}>
      <Layout>
        <Component {...pageProps} />
        <GlobalStyles />
      </Layout>
    </DAppProvider>
  );
}

export default LogbookApp;
