import type { ReactNode } from "react";
import classNames from "classnames";

import { Head } from "~/components";

import Header from "./Header";
import Footer from "./Footer";

import FixedMain from "./FixedMain";

import styles from "./styles.module.css";

type PageProps = {
  footer?: ReactNode;
};

const Layout: React.FC<PageProps> & {
  FixedMain: typeof FixedMain;
} = ({ children, footer }) => {
  return (
    <>
      <Head />
      <div className="l-container">
        <Header />
        <main className={classNames(["l-row", styles.main])}>
          <article className="l-col-full">{children}</article>
        </main>
        {footer ?? <Footer />}
      </div>
    </>
  );
};

Layout.FixedMain = FixedMain;

export { Layout, Header };
