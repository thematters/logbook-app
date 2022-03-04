import type { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Head, Layout } from "~/components";

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

      <h1 className={styles.title}>Homepage</h1>

      <Hero />
      <About />
    </>
  );
};

Homepage.getLayout = function getLayout(page) {
  return <Layout footer={<Footer />}>{page}</Layout>;
};

export default Homepage;
