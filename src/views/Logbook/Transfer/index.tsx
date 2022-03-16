import React from "react";

import { TextIcon } from "~/components";
import styles from "./styles.module.css";

export interface TransferProps {
  transferCount?: number;
}

export const Transfer: React.FC<TransferProps> = ({ transferCount }) => {
  return (
    <section className={styles.container}>
      <span>Transfer</span>
      <TextIcon color="blueGreen">{transferCount || 0}</TextIcon>
    </section>
  );
};
