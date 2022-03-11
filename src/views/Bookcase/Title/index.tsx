import React from "react";

import { IconEtherScan, TextIcon, TextIconProps, IconSize } from "~/components";

import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

export const Title = () => {
  const isSmallUp = useResponsive("sm-up");

  let titleProps: TextIconProps = {
    size: "md",
  };
  let iconSize: IconSize = "lg";

  if (isSmallUp) {
    titleProps.size = "lg";
    iconSize = "xl";
  }

  return (
    <section>
      <section className={styles.title}>
        <TextIcon
          weight="bold"
          color="black"
          spacing="xTight"
          {...titleProps}
          icon={<IconEtherScan size={iconSize} />}
        >
          ugomozie.eth
        </TextIcon>
      </section>
      <section className={styles.bio}>
        <p>
          I turned my passion into a career | On a mission to save the world.
        </p>
      </section>
    </section>
  );
};
