import "../styles/variables/breakpoints.css";
import "../styles/variables/colors.css";
import "../styles/variables/typography.css";
import "../styles/variables/spacing.css";
import "../styles/reset.css";
import "../styles/base.css";

import type { AppProps } from "next/app";

function LogbookApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default LogbookApp;
