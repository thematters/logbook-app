import React from "react";
import { useEnsLookup } from "wagmi";
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
  // const [{ data, error, loading }] = useEnsLookup({
  //   address: address.toLowerCase(),
  // });
  const isSmallUp = useResponsive("sm-up");

  // if (loading) return <Spinner />;
  // if (error) return <div>Error fetching name</div>;

  let titleProps: TextIconProps = {
    size: "md",
  };
  let iconSize: IconSize = "lg";

  if (isSmallUp) {
    titleProps.size = "lg";
    iconSize = "xl";
  }

  const { url, maskedAddress } = toPolygonAddressUrl(address);

  return (
    <section>
      <section className={styles.title}>
        {/* TODO: link to etherscan */}
        <TextIcon
          weight="bold"
          color="black"
          spacing="xTight"
          {...titleProps}
          icon={<IconEtherScan size={iconSize} />}
        >
          {maskedAddress}
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
