import { Button, Container, TextIcon, ClaimLogbookDialog } from "~/components";
import { useResponsive } from "~/hooks";
// import { BannerVideo } from "~/components/BannerVideo";

import styles from "./styles.module.css";

export const Hero = () => {
  const isMediumUp = useResponsive("md-up");

  return (
    <section className={styles.hero}>
      <Container className={styles.content}>
        <section className={styles.intro}>
          <h2>Deliver value and share benefits</h2>
          <p className={styles.subtitle}>Create, Transfer, Relay</p>
        </section>

        <section className={styles.dynamic}>
          {/* <div className={styles.image}></div> */}
          <img src="/images/logbook-intro.png" width="100%" />
          {/* <BannerVideo /> */}
        </section>

        <section className={styles.buttons}>
          <ClaimLogbookDialog>
            {({ openDialog }) => (
              <Button
                // width="15rem"
                width={isMediumUp ? "15rem" : "100%"}
                // spacing={["tight", "loose"]}
                spacing={["tight", 0]}
                // textColor="blueGreen"
                bgColor="lightMetal"
                bgActiveColor="lightMetalHover"
                // shadow={true}
                borderRadius="1.5rem"
                onClick={() => {
                  // TODO: analytics
                  openDialog();
                }}
              >
                <TextIcon color="blueGreen">Claim</TextIcon>
              </Button>
            )}
          </ClaimLogbookDialog>
          <Button
            width={isMediumUp ? "15rem" : "100%"}
            // spacing={["tight", "loose"]}
            spacing={["tight", 0]}
            // textColor="white"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
            // shadow={true}
            borderRadius="1.5rem"
            href="/bookcase"
            onClick={() => {
              // TODO: analytics
            }}
          >
            <TextIcon color="white">My Bookcase</TextIcon>
          </Button>
        </section>
      </Container>

      <section className={styles.leftRadial} />
      <section className={styles.rightRadial} />
    </section>
  );
};
