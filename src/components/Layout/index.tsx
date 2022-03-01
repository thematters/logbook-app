import { Head } from "~/components";

import Header from "./Header";
// import Footer from "./Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head />

      <div className="l-container">
        <main className="l-row">
          <Header />
          <article className="l-col-full">{children}</article>
        </main>
      </div>
    </>
  );
};

// Layout.Header = Header;
// Layout.Footer = Footer;
