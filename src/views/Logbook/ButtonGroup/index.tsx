import classNames from "classnames";
import _debounce from "lodash/debounce";
import React, { useState } from "react";

import {
  Button,
  Card,
  DropdownDialog,
  GiftTransferDialog,
  IconEdit,
  IconGift,
  IconGiftGradient,
  IconMore,
  IconShare,
  IconShareFat,
  IconShoppingCart,
  IconSettings,
  SettingsDialog,
  TextIcon,
  ShareDialog,
} from "~/components";
import { LogbookContext } from "~/hooks";
import { toOpenseaUrl } from "~/utils";

import styles from "./styles.module.css";

const DropdownMenu: React.FC<{
  id: string;
  openSettingsDialog: () => any;
  openShareDialog: () => any;
}> = ({ id, openSettingsDialog, openShareDialog }) => (
  <ul role="menu" className={classNames(["reset", styles.menu])}>
    <li role="menu-item">
      <Card onClick={openShareDialog}>
        <IconShareFat size="md" />
        <TextIcon>Share this Logbook</TextIcon>
      </Card>
    </li>
    <li role="menu-item">
      <Card htmlHref={toOpenseaUrl(id)} htmlTarget="_blank">
        <IconShoppingCart size="md" />
        <TextIcon>OpenSea page</TextIcon>
      </Card>
    </li>
    <li role="menu-item">
      <Card onClick={openSettingsDialog}>
        <IconSettings size="md" />
        <TextIcon>Setting</TextIcon>
      </Card>
    </li>
  </ul>
);

interface Props {
  // hex id
  id: string;
  isOwn: boolean;
  onEdit: () => any;
  title: string;
  description: string;
}

export const ButtonGroup: React.FC<Props> = ({
  id,
  title,
  description,
  isOwn,
  onEdit,
}) => {
  const [hover, updateHover] = useState(false);

  return (
    <section className={styles.container}>
      {isOwn && (
        <div className={styles.actions}>
          <Button
            width="3rem"
            height="3rem"
            borderRadius="50%"
            bgColor="blueGreen"
            bgActiveColor="blueGreenDarker"
            className={styles.hoverButton}
            onClick={() => {
              // TODO: analytics
              // console.log("Edit");
              onEdit();
            }}
          >
            <IconEdit className={styles.scaleUp} />
          </Button>

          <GiftTransferDialog tokenId={id}>
            {({ openDialog }) => (
              <Button
                width="3rem"
                height="3rem"
                borderRadius="50%"
                bgColor="white"
                className={styles.hoverButton}
                onClick={() => {
                  // TODO: analytics
                  openDialog();
                  console.log("Gift");
                }}
                onMouseEnter={() => updateHover(true)}
                onMouseLeave={() => updateHover(false)}
              >
                <span className={styles.iconWrapper}>
                  <IconGift className={styles.scaleUp} />
                  <IconGiftGradient
                    className={`${styles.scaleUp} ${styles.giftIcon} ${
                      hover && styles.giftIconHover
                    }`}
                  />
                </span>
              </Button>
            )}
          </GiftTransferDialog>

          <ShareDialog title={title} description={description}>
            {({ openDialog: openShareDialog }) => (
              <SettingsDialog tokenId={id}>
                {({ openDialog: openSettingsDialog }) => (
                  <DropdownDialog
                    dropdown={{
                      content: (
                        <DropdownMenu
                          id={id}
                          openSettingsDialog={openSettingsDialog}
                          openShareDialog={openShareDialog}
                        />
                      ),
                      placement: "bottom-end",
                    }}
                    dialog={{
                      title: "moreActions",
                      content: (
                        <DropdownMenu
                          id={id}
                          openSettingsDialog={openSettingsDialog}
                          openShareDialog={openShareDialog}
                        />
                      ),
                    }}
                  >
                    {({ openDialog, ref }) => (
                      <Button
                        width="3rem"
                        height="3rem"
                        borderRadius="50%"
                        bgColor="white"
                        className={`${styles.moreButton} ${styles.hoverButton}`}
                        ref={ref}
                        onClick={openDialog}
                      >
                        <IconMore
                          // size="xl"
                          // weight="bold"
                          className={styles.scaleUp}
                        />
                      </Button>
                    )}
                  </DropdownDialog>
                )}
              </SettingsDialog>
            )}
          </ShareDialog>
        </div>
      )}

      {!isOwn && (
        <div className={styles.actions}>
          <Button
            width="3rem"
            height="3rem"
            borderRadius="50%"
            bgColor="blueGreen"
            bgActiveColor="blueGreenDarker"
            className={styles.hoverButton + " " + styles.shoppingCard}
            htmlHref={toOpenseaUrl(id)}
            htmlTarget="_blank"
            onClick={() => {
              // TODO: analytics
              // console.log("buy");
            }}
          >
            <IconShoppingCart size="md" weight="bold" color="white" />
          </Button>
          <ShareDialog>
            {({ openDialog: openShareDialog }) => (
              <Button
                borderRadius="50%"
                bgColor="white"
                width="3rem"
                height="3rem"
                className={styles.hoverButton + " " + styles.shareButton}
                onClick={() => {
                  // TODO: analytics
                  // TODO: share
                  openShareDialog();
                }}
              >
                <IconShareFat size="md" weight="bold" color="greyDarker" />
              </Button>
            )}
          </ShareDialog>
        </div>
      )}
    </section>
  );
};
