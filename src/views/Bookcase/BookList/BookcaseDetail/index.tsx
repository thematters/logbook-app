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
  IconShoppingCart,
  IconSettings,
  SettingsDialog,
  TextIcon,
} from "~/components";

import styles from "./styles.module.css";

interface Props {
  id: string;
  transferCount: string;
}

const DropdownMenu: React.FC<{ id: string; openSettingsDialog: () => any }> = ({
  id,
  openSettingsDialog,
}) => (
  <ul role="menu" className={styles.menu}>
    <li role="menu-item">
      <Card>
        <IconShare size="md" />
        <TextIcon>Share this Logbook</TextIcon>
      </Card>
    </li>
    <li role="menu-item">
      <Card htmlHref={`https://opensea.io/${id}`} htmlTarget="_blank">
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

const BookcaseDetail: React.FC<Props> = ({ id, transferCount }) => {
  return (
    <section className={styles.container}>
      <h2>Book {id}</h2>
      <div className={styles.subtitle}>
        <div>Transfer {transferCount}</div>
        <div className={styles.actions}>
          <Button
            borderRadius="50%"
            onClick={() => {
              // TODO: analytics
              console.log("Edit");
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
      </div>
    </section>
  );
};

export default BookcaseDetail;
