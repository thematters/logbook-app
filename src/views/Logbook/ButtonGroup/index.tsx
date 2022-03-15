import classNames from "classnames";
import _debounce from "lodash/debounce";
import React, { useState, useRef } from "react";

import {
  Button,
  Card,
  DropdownDialog,
  GiftTransferDialog,
  IconEdit,
  IconGift,
  IconMore,
  IconShare,
  IconShareFat,
  IconShoppingCart,
  IconSettings,
  SettingsDialog,
  TextIcon,
} from "~/components";
import { toOpenseaUrl } from "~/utils";

import styles from "./styles.module.css";

const DropdownMenu: React.FC<{ id: string; openSettingsDialog: () => any }> = ({
  id,
  openSettingsDialog,
}) => (
  <ul role="menu" className={classNames(["reset", styles.menu])}>
    <li role="menu-item">
      <Card>
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
}

export const ButtonGroup: React.FC<Props> = ({ id, isOwn, onEdit }) => {
  const [isEditing, enableEditing] = useState(false);

  return (
    <section className={styles.container}>
      {isOwn && (
        <div className={styles.actions}>
          <Button
            borderRadius="50%"
            onClick={() => {
              // TODO: analytics
              console.log("Edit");
              // enableEditing(true);
              onEdit();
            }}
          >
            <IconEdit
              size="xl"
              weight="bold"
              color="green"
              className={styles.scaleUp}
            />
          </Button>

          <GiftTransferDialog tokenId={id}>
            {({ openDialog }) => (
              <Button
                onClick={() => {
                  // TODO: analytics
                  openDialog();
                  console.log("Gift");
                }}
              >
                <IconGift size="xl" className={styles.scaleUp} />
              </Button>
            )}
          </GiftTransferDialog>

          <SettingsDialog tokenId={id}>
            {({ openDialog: openSettingsDialog }) => (
              <DropdownDialog
                dropdown={{
                  content: (
                    <DropdownMenu
                      id={id}
                      openSettingsDialog={openSettingsDialog}
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
                    />
                  ),
                }}
              >
                {({ openDialog, ref }) => (
                  <Button ref={ref} onClick={openDialog}>
                    <IconMore
                      size="xl"
                      weight="bold"
                      className={styles.scaleUp}
                    />
                  </Button>
                )}
              </DropdownDialog>
            )}
          </SettingsDialog>
        </div>
      )}

      {!isOwn && (
        <div className={styles.actions}>
          <Button
            borderRadius="50%"
            bgColor="blueGreen"
            width="3rem"
            height="3rem"
            htmlHref={toOpenseaUrl(id)}
            htmlTarget="_blank"
            className={styles.shoppingCard}
            onClick={() => {
              // TODO: analytics
              // console.log("buy");
            }}
          >
            <IconShoppingCart size="md" weight="bold" color="white" />
          </Button>

          <Button
            borderRadius="50%"
            bgColor="white"
            width="3rem"
            height="3rem"
            onClick={() => {
              // TODO: analytics
              // TODO: share
            }}
          >
            <IconShareFat size="md" weight="bold" color="greyDarker" />
          </Button>
        </div>
      )}
    </section>
  );
};
