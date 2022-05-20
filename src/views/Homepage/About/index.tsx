import { Container, IconArrowRight, IconWave, TextIcon } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

export const About = () => {
  const isMediumUp = useResponsive("md-up");

  return (
    <Container>
      <section className={styles.container}>
        <section className={styles.intro}>
          <TextIcon
            color="black"
            icon={isMediumUp ? <IconArrowRight size="xxl" /> : null}
            size={isMediumUp ? "xl" : "xm"}
            spacing={isMediumUp ? "loose" : "base"}
            textPlacement="left"
            weight="bold"
          >
            About Matters Lab
          </TextIcon>
          <p className={styles.subtitle}>Powering the future of Web3</p>
          <p className={styles.content}>
            Matters Lab is building a Web3 social media ecosystem that makes
            possible co-creation and monetization of digital assets with
            autonomy.
          </p>
        </section>
        <section className={styles.links}>
          <ul className="reset">
            <li>
              <a
                href="https://matters.news/"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                Matters.News
                <IconWave className={styles.wave} />
              </a>
            </li>
            <li>
              <a
                href="https://traveloggers.matters.news/"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                Traveloggers
                <IconWave className={styles.wave} />
              </a>
            </li>
            <li>
              <a
                href="https://thespace.game/"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                The Space
                <IconWave className={styles.wave} />
              </a>
            </li>
            <li>
              <a
                href="https://matters-lab.io/"
                rel="noreferrer"
                target="_blank"
                className={styles.link}
              >
                About Us
                <IconWave className={styles.wave} />
              </a>
            </li>
          </ul>
        </section>
      </section>
    </Container>
  );
};
