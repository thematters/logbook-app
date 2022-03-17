import classNames from "classnames";
import _debounce from "lodash/debounce";
import React from "react";

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
}

export const ButtonGroup: React.FC<Props> = ({ id, isOwn, onEdit }) => (
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

        <ShareDialog>
          {({ openDialog: openShareDialog }) => (
            <SettingsDialog id={id}>
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
          )}
        </ShareDialog>
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
        <ShareDialog>
          {({ openDialog: openShareDialog }) => (
            <Button
              borderRadius="50%"
              bgColor="white"
              width="3rem"
              height="3rem"
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
