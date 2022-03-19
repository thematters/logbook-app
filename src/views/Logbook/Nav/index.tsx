import React from "react";
import Link from "next/link";

import { IconAngleLeft, TextIcon } from "~/components";

import styles from "./styles.module.css";
import { toPolygonAddressUrl } from "~/utils";
export interface NavProps {
  id: String;
  isOwn: boolean;
  OwnerId: string;
}

export const Nav: React.FC<NavProps> = ({ id, isOwn, OwnerId }) => {
  const { url, maskedAddress } = toPolygonAddressUrl(OwnerId);

  return (
    <section className={styles.container}>
      <Link href={`/bookcase?address=${OwnerId}`}>
        <a>
          <TextIcon
            icon={<IconAngleLeft size="smS" />}
            color="grey"
            weight="bold"
          >
            {isOwn ? "My Bookcase" : maskedAddress}
            <span className={styles.interpunct}>・</span>
          </TextIcon>
        </a>
      </Link>
      <TextIcon color="blueGreen" weight="bold">
        <span>#&nbsp;</span>
        <span>{id}</span>
      </TextIcon>
    </section>
  );
};
