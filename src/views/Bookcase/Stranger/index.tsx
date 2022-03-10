import React from "react";

import { Button, IconBookEye, TextIcon } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

export const Stranger = () => {
  let iconStyle = { width: '157px', height: '159px' };
  const isSmallUp = useResponsive('sm-up');
  let buttonWidth = "19.43rem";
  if (isSmallUp) {
    buttonWidth = "12.5rem"
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hi, stranger；)</h1>
      <p className={styles.information}>
        Here is a playground to write your thoughts, stories or anything you
        want to share. Connect wallet to check out your bookcase.
      </p>
      <section>
        <IconBookEye style={iconStyle} />
      </section>
      <Button
        width={buttonWidth}
        height="3rem"
        bgColor="blueGreen"
        borderRadius="6.25rem"
        shadow
      >
        <TextIcon color="white" weight="medium">Connect Wallet</TextIcon>
      </Button>
    </div>
  );
};
