import type { ReactNode } from "react";

import { Head } from "~/components";

import Header from "./Header";
import Footer from "./Footer";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// init Apollo and inject it to context
const API_ENDPOINT = process.env.NEXT_PUBLIC_THE_GRAPH_API_URL;
const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

type PageProps = {
  footer?: ReactNode;
};

const Layout: React.FC<PageProps> = ({ children, footer }) => {
  return (
    <>
      <Head />
      <ApolloProvider client={client}>
        <div className="l-container">
          <Header />
          <main className="l-row">
            <article className="l-col-full">{children}</article>
          </main>
          {footer ?? <Footer />}
        </div>
      </ApolloProvider>
    </>
  );
};

export { Layout, Header };
