import React, { useEffect } from "react";
import classNames from "classnames";
import { useAccount } from "wagmi";

import {
  IconLibrary,
  IconBookcase,
  IconWalletGradient,
  IconSize,
  ConnectWalletDialog,
} from "~/components";
import Item from "./Item";

import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";

type ItemListProps = {
  show: boolean;
  onClick: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => any;
};

const ItemList: React.FC<ItemListProps> = ({ show, onClick }) => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const containerClasses = classNames({
    [styles.itemList]: true,
    [styles.show]: show,
  });
  const isSmallUp = useResponsive("sm-up");
  let iconSize: IconSize = "mdS";
  if (isSmallUp) {
    iconSize = "md";
  }

  if (accountData) {
    return (
      <>
        <ul className={containerClasses}>
          <Item
            href="library"
            text="Library"
            onClick={onClick}
            icon={<IconLibrary size={iconSize} />}
          ></Item>
          <Item
            href="bookcase"
            text="My Bookcase"
            onClick={onClick}
            icon={<IconBookcase size={iconSize} />}
          ></Item>
          <Item
            text={
              accountData.ens?.name
                ? `${accountData.ens?.name}`
                : accountData.address
            }
            icon={<IconWalletGradient size={iconSize} />}
            onClick={() => {
              disconnect();
            }}
          ></Item>
        </ul>
      </>
    );
  }
  return (
    <>
      <ul className={classNames(["reset", containerClasses])}>
        <Item
          href="library"
          text="Library"
          onClick={onClick}
          icon={<IconLibrary size={iconSize} />}
        />
        <ConnectWalletDialog>
          {({ openDialog }) => (
            <Item
              text="Connect Wallet"
              icon={<IconWalletGradient size={iconSize} />}
              onClick={() => {
                if (isSmallUp) {
                  onClick();
                }
                openDialog();
              }}
            />
          )}
        </ConnectWalletDialog>
      </ul>
    </>
  );
};

export default ItemList;
