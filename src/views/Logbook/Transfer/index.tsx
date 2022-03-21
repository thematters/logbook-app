import React from "react";

import { TextIcon } from "~/components";
import styles from "./styles.module.css";

export interface TransferProps {
  transferCount?: number;
}

export const Transfer: React.FC<TransferProps> = ({ transferCount = 0 }) => {
  return (
    <section className={styles.container}>
      <span>Transfers</span>
      <TextIcon color="blueGreen">{transferCount}</TextIcon>
    </section>
  );
};
