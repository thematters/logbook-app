import type { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Head, Layout, Header } from "~/components";

import { About } from "./About";
import { FAQ } from "./FAQ";
import { RecentlyWritten } from "./RecentlyWritten";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

import Footer from "./Footer";
import { Hero } from "./Hero";

import styles from "./styles.module.css";

const Homepage: Page = () => {
  return (
    <>
      <Head title="Homepage" />

      <Hero />
      <RecentlyWritten />
      <FAQ />
      <About />
    </>
  );
};

Homepage.getLayout = function getLayout(page) {
  return (
    <div style={{ display: "grid" }}>
      <Header />
      <main>
        <article>{page}</article>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
