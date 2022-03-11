import React from "react";

import {
  Button,
  GiftTransferDialog,
  IconEdit,
  IconGift,
  IconMore,
  TextIcon,
} from "~/components";

import styles from "./styles.module.css";

interface Props {
  id: string;
}

const BookcaseDetail: React.FC<Props> = ({ id }) => {
  return (
    <section className={styles.container}>
      <h2>Book {id}</h2>
      <div className={styles.subtitle}>
        <div>Transfer 0</div>
        <div className={styles.actions}>
          <Button
            onClick={() => {
              // TODO: analytics
              console.log("Edit");
            }}
          >
            <IconEdit size="xl" weight="bold" color="green" />
          </Button>

          <GiftTransferDialog>
            {({ openDialog }) => (
              <Button
                onClick={() => {
                  // TODO: analytics
                  openDialog();
                  console.log("Gift");
                }}
              >
                <IconGift size="xl" />
              </Button>
            )}
          </GiftTransferDialog>
          <Button
            onClick={() => {
              // TODO: analytics
              console.log("More settings...");
            }}
          >
            <IconMore size="xl" weight="bold" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookcaseDetail;
