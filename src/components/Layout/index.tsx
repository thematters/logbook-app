import type { ReactNode } from "react";

import { Head } from "~/components";

import Header from "./Header";
import Footer from "./Footer";

type PageProps = {
  footer?: ReactNode;
};

export const Layout: React.FC<PageProps> = ({ children, footer }) => {
  return (
    <>
      <Head />

      <div className="l-container">
        <Header />
        <main className="l-row">
          <article className="l-col-full">{children}</article>
        </main>
        {footer ?? <Footer />}
      </div>
    </>
  );
};

// Layout.Header =
export { Header };

// Layout.Footer = Footer;
