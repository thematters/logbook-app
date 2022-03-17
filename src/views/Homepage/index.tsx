import type { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Head, Layout, Header } from "~/components";

import { IntroSection } from "./IntroSection";
import { Showcase } from "./Showcase";
import { RecentlyWritten } from "./RecentlyWritten";
import { FAQ } from "./FAQ";
import { About } from "./About";

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
      <IntroSection />
      <Showcase />
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
