import React from "react";

import { TextIcon } from "~/components";
import styles from "./styles.module.css";

export interface TransferProps {
  transferCount: Number;
}

export const Transfer: React.FC<TransferProps> = ({ transferCount }) => {
  return (
    <section className={styles.container}>
      <span>Transfer</span>
      <TextIcon color="blueGreen">{transferCount}</TextIcon>
    </section>
  );
};
