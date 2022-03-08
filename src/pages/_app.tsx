import type { AppLayoutProps } from "next/app";

import "../styles/variables/breakpoints.css";
import "../styles/variables/colors.css";
import "../styles/variables/typography.css";
import "../styles/variables/spacing.css";
import "../styles/variables/z-index.css";
import "../styles/reset.css";
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/vendors/tippy.css";
import "../styles/vendors/reach.css";

import { Layout } from "~/components";
import { GlobalStyles } from "~/components/GlobalStyles";

function LogbookApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout;

  if (getLayout) {
    return (
      <>
        {getLayout(<Component {...pageProps} />)}
        <GlobalStyles />
      </>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
      <GlobalStyles />
    </Layout>
  );
}

export default LogbookApp;
