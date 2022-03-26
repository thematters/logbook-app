import { Button, Container, TextIcon, ClaimLogbookDialog } from "~/components";

import styles from "./styles.module.css";

import { useResponsive } from "~/hooks";

export const IntroSection = () => {
  const isSmallUp = useResponsive("sm-up");
  const children = (
    <>
      <div className={styles.bar} />
      <div className={styles.text}>
        <p>
          Using Logbook to write down your thoughts, stories or anything you
          liked to share on the Polygon chain.
        </p>
        ​​
        <p>
          ​​Transfer your thoughts to who you want to invite them to co-create.
        </p>
      </div>
      <div className={styles.bar} />
      <div className={styles.left} />
      <div className={styles.right} />
    </>
  );
  if (isSmallUp) {
    return <Container className={styles.content}>{children}</Container>;
  }
  return <section className={styles.content}>{children}</section>;
};
