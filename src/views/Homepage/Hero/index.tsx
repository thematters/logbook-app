// import Image from "next/image";
import classNames from "classnames";

import { Button, ClaimLogbookDialog } from "~/components";
import { useResponsive } from "~/hooks";
// import { BannerVideo } from "~/components/BannerVideo";

import styles from "./styles.module.css";

export const Hero = () => {
  const isSmallUp = useResponsive("sm-up");

  return (
    <section className={styles.hero}>
      <section className={styles.intro}>
        <h2>Deliver value and share benefits</h2>
        <p className={styles.subtitle}>Create, Transfer, Relay</p>
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

      <section className={styles.buttons}>
        <ClaimLogbookDialog>
          {({ openDialog }) => (
            <Button
              // width="15rem"
              width={isSmallUp ? "15rem" : "100%"}
              // spacing={["tight", "loose"]}
              spacing={["tight", 0]}
              textColor="blueGreen"
              bgColor="lightMetal"
              bgActiveColor="lightMetalHover"
              // shadow={true}
              borderRadius="1.5rem"
              onClick={openDialog}
            >
              Claim
            </Button>
          )}
        </ClaimLogbookDialog>

        <Button
          width={isSmallUp ? "15rem" : "100%"}
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
      </section>

      <section className={styles.leftRadial} />
      <section className={styles.rightRadial} />
    </section>
  );
};
