import React from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  IconEtherScan,
  TextIcon,
  TextIconProps,
  IconSize,
  Spinner,
} from "~/components";

import { useResponsive } from "~/hooks";

import { toPolygonAddressUrl } from "~/utils";

import styles from "./styles.module.css";

export interface TitleProps {
  address: string;
}

export const Title: React.FC<TitleProps> = ({ address }) => {
  // TODO: lookup ens name in polygon?
  const [{ data: accountData }] = useAccount();
  const router = useRouter();
  const { address: urlAddress } = router.query;
  const isSmallUp = useResponsive("sm-up");

  let titleProps: TextIconProps = {
    size: "md",
  };
  let iconSize: IconSize = "lg";

  if (isSmallUp) {
    titleProps.size = "lg";
    iconSize = "xl";
  }

  const isMyBookCase =
    (accountData && !urlAddress) ||
    accountData?.address?.toLowerCase() ===
      (urlAddress as string).toLowerCase();

  const { url, maskedAddress } = toPolygonAddressUrl(address);
  console.log({ url });
  return (
    <section>
      <section className={styles.title}>
        <a href={url} target="_blank" rel="noreferrer">
          <TextIcon
            weight="bold"
            color="black"
            spacing="xTight"
            {...titleProps}
            icon={<IconEtherScan size={iconSize} />}
          >
            {isMyBookCase ? "My Bookcase" : maskedAddress}
          </TextIcon>
        </a>
      </section>
      {/*  */}
      {/* <section className={styles.bio}>
        <p>
          I turned my passion into a career | On a mission to save the world.
        </p>
      </section> */}
    </section>
  );
};
