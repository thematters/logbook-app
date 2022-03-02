import "../styles/variables/breakpoints.css";
import "../styles/variables/colors.css";
import "../styles/variables/typography.css";
import "../styles/variables/spacing.css";
import "../styles/variables/z-index.css";
import "../styles/reset.css";
import "../styles/base.css";
import "../styles/layout.css";

import type { AppLayoutProps } from "next/app";

import { Layout } from "~/components";

function LogbookApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout;

  if (getLayout) {
    return getLayout(<Component {...pageProps} />);
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default LogbookApp;
