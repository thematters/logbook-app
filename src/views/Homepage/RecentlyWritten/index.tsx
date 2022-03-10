import React from "react";

import { Button, TextIcon, ButtonProps } from "~/components";
import { CardList } from "./CardList";

import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

export const RecentlyWritten = () => {
  const isSmallUP = useResponsive("sm-up");

  let buttonProps: ButtonProps = {
    width: "100%",
    height: "3rem",
    bgColor: "heavyMetal",
    bgActiveColor: "heavyMetalHover",
    borderRadius: "1.75rem",
    shadow: true,
    href: "/library",
    className: [styles.button],
  };

  if (isSmallUP) {
    buttonProps.height = "3.5rem";
  }

  const buttonChild = (
    <TextIcon color="white" weight="medium">
      Enter Library
    </TextIcon>
  );

  const buttonElement = <Button {...buttonProps}>{buttonChild}</Button>;

  if (isSmallUP) {
    return (
      <section className={styles.recentlyWritten}>
        <div className={styles.header}>
          <h1 className={styles.title}>Recently written</h1>
          {buttonElement}
        </div>
        <CardList />
      </section>
    );
  }

  return (
    <section className={styles.recentlyWritten}>
      <h1 className={styles.title}>Recently written</h1>
      <CardList />
      {buttonElement}
    </section>
  );
};
