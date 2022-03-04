// import Image from "next/image";
import classNames from "classnames";

import { Button } from "~/components";
// import { BannerVideo } from "~/components/BannerVideo";

import styles from "./styles.module.css";

export const Hero = () => (
  <section className={styles.hero}>
    <section className={styles.leftRadial} />
    <section className={styles.rightRadial} />

    <section className={styles.intro}>
      <h2>Deliver value and share benefits</h2>
      <p className={styles.subtitle}>Create, Transfer, Relay</p>

      <div className={styles.buttons}>
        <Button
          width="15rem"
          // spacing={["tight", "loose"]}
          spacing={["tight", 0]}
          textColor="blueGreen"
          bgColor="lightMetal"
          bgActiveColor="lightMetalHover"
          // shadow={true}
          borderRadius="1.5rem"
          onClick={() => {}}
        >
          Claim
        </Button>
        <Button
          width="15rem"
          // spacing={["tight", "loose"]}
          spacing={["tight", 0]}
          textColor="white"
          bgColor="heavyMetal"
          bgActiveColor="heavyMetalHover"
          // shadow={true}
          borderRadius="1.5rem"
          onClick={() => {}}
        >
          My Bookcase
        </Button>
      </div>
    </section>
    <section className={styles.dynamic}>
      <div
        style={{
          minWidth: "340px",
          minHeight: "340px",
          backgroundImage: `url("/images/logbook-intro.png")`,
        }}
      ></div>
      {/* <BannerVideo /> */}
    </section>
  </section>
);
