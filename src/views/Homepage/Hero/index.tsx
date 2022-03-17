import dynamic from "next/dynamic";

import { Button, Container, TextIcon, ClaimLogbookDialog } from "~/components";

import styles from "./styles.module.css";

const DynamicIntro = dynamic(() => import("~/components/BannerVideo"), {
  loading: () => <img src="/images/logbook-intro.png" width="100%" />,
});

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container className={styles.content}>
        <section className={styles.intro}>
          <h2>A Collective Book of Your Web3 Trek</h2>
          <p className={styles.subtitle}>Transfer to co-create</p>
        </section>

        <section className={styles.dynamic}>
          <DynamicIntro
            url="/video/Banner-book_cover.webm"
            posterImg="/images/logbook-intro.png"
          />
          <section className={styles.arrowHero} />
        </section>

        <section className={styles.buttons}>
          <ClaimLogbookDialog>
            {({ openDialog }) => (
              <>
                <Button
                  className="u-sm-down-hide"
                  width="15rem"
                  height="3.5rem"
                  bgColor="lightMetal"
                  bgActiveColor="lightMetalHover"
                  borderRadius="1.75rem"
                  onClick={() => {
                    // TODO: analytics
                    openDialog();
                  }}
                >
                  <TextIcon size="md" weight="bold" color="blueGreen">
                    Claim
                  </TextIcon>
                </Button>

                <Button
                  className="u-sm-up-hide"
                  width="100%"
                  height="3rem"
                  bgColor="lightMetal"
                  bgActiveColor="lightMetalHover"
                  borderRadius="1.75rem"
                  onClick={() => {
                    // TODO: analytics
                    openDialog();
                  }}
                >
                  <TextIcon size="mdS" weight="bold" color="blueGreen">
                    Claim
                  </TextIcon>
                </Button>
              </>
            )}
          </ClaimLogbookDialog>

          <Button
            className="u-sm-down-hide"
            width="15rem"
            height="3.5rem"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
            borderRadius="1.75rem"
            href="/bookcase"
            onClick={() => {
              // TODO: analytics
            }}
          >
            <TextIcon size="md" weight="bold" color="white">
              My Bookcase
            </TextIcon>
          </Button>
          <Button
            className="u-sm-up-hide"
            width="100%"
            height="3rem"
            bgColor="heavyMetal"
            bgActiveColor="heavyMetalHover"
            borderRadius="1.75rem"
            href="/bookcase"
            onClick={() => {
              // TODO: analytics
            }}
          >
            <TextIcon size="mdS" weight="bold" color="white">
              My Bookcase
            </TextIcon>
          </Button>
        </section>
      </Container>

      <section className={styles.leftRadial} />
      <section className={styles.rightRadial} />
    </section>
  );
};
