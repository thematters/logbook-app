import _debounce from "lodash/debounce";
import React, { useState } from "react";
import dynamic from "next/dynamic";

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
  // RichMarkdownEditor,
  Spinner,
  TextIcon,
} from "~/components";

const RichMarkdownEditor = dynamic(
  () => import("~/components/RichMarkdownEditor"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

import styles from "./styles.module.css";

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

interface Props {
  id: string;
  transferCount: string;
  content: string;
}

const BookcaseDetail: React.FC<Props> = ({ id, transferCount, content }) => {
  const [isEditing, enableEditing] = useState(false);

  const editorUpdate = _debounce(({ text }: { text: string }) => {
    console.log("got update:", text);
  }, 300);

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
              enableEditing(true);
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
      {isEditing && (
        <RichMarkdownEditor
          placeholder="Write *something*..."
          initialContent={content}
          editorUpdate={editorUpdate}
        />
      )}
    </section>
  );
};

export default BookcaseDetail;
