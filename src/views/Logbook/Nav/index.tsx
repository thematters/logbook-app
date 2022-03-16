import React from "react";
import Link from "next/link";

import { IconAngleLeft, TextIcon } from "~/components";

import styles from "./styles.module.css";

export interface NavProps {
  tokenID: String;
}

export const Nav: React.FC<NavProps> = ({ tokenID }) => {
  return (
    <section className={styles.container}>
      <Link href="/bookcase">
        <a>
          <TextIcon
            icon={<IconAngleLeft size="smS" />}
            color="grey"
            weight="bold"
          >
            My Bookcase<span className={styles.interpunct}>・</span>
          </TextIcon>
        </a>
      </Link>
      <TextIcon color="blueGreen" weight="bold">
        <span>#&nbsp;</span>
        <span>{tokenID}</span>
      </TextIcon>
    </section>
  );
};
