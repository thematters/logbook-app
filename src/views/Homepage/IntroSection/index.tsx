import { Button, Container, TextIcon, ClaimLogbookDialog } from "~/components";

import styles from "./styles.module.css";

export const IntroSection = () => (
  <Container className={styles.content}>
    <div className={styles.bar} />
    <div className={styles.text}>
      <p>
        Using Logbook to write down your thoughts, stories or anything you liked
        to share on the Polygon chain.
      </p>
      ​​
      <p>
        ​​Transfer your thoughts to who you want to invite them to co-create.
      </p>
    </div>
    <div className={styles.bar} />
    <div className={styles.left} />
    <div className={styles.right} />
  </Container>
);
