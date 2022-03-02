// import Image from "next/image";
import classNames from "classnames";

import { Button } from "~/components";
// import { BannerVideo } from "~/components/BannerVideo";

import styles from "./styles.module.css";

export const Hero = () => (
  <>
    <section className={styles.leftBackground} />
    <section className={styles.rightBackground} />

    <section className={classNames([styles.hero, "l-col-full"])}>
      <section className={styles.left}>
        <h2>Deliver value and share benefits</h2>
        <p className={styles.dynamic}>Create, Transfer, Relay</p>
        <div className={styles.buttons}>
          <Button
            // width="12rem"
            spacing={["tight", "loose"]}
            textColor="blueGreen"
            // bgColor="lightMetal"
            // shadow={true}
            onClick={() => {}}
          >
            Claim
          </Button>
          <Button
            // width="12rem"
            spacing={["tight", "loose"]}
            textColor="white"
            // bgColor="heavyMetal"
            // shadow={true}
            onClick={() => {}}
          >
            My Bookcase
          </Button>
        </div>
      </section>
      <section className={styles.right}>
        <img
          src="/images/logbook-intro.png"
          alt="intro"
          width="640"
          height="700"
        />
        {/* <BannerVideo /> */}
      </section>
    </section>
  </>
);
