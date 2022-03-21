import type { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { Head, Layout, Header } from "~/components";

import { IntroSection } from "./IntroSection";
import { Showcase } from "./Showcase";
import { RecentlyWritten } from "./RecentlyWritten";
import { HalfArrow } from "./HalfArrow";
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

      <svg
        className={styles.svg}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath
            id="clipping"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.005, 0.004385964912281)"
          >
            <path d="M0.030766 136.327C1.44292 77.7242 27.5678 64.3091 65.6961 24.7699C122.889 -22.5358 161.017 2.17614 188.554 62.897C216.091 123.618 194.202 199.872 120.064 222.466C45.9259 245.06 -1.38139 194.93 0.030766 136.327Z" />
          </clipPath>
        </defs>
      </svg>

      <Hero />
      <IntroSection />
      <Showcase />
      <HalfArrow />

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
