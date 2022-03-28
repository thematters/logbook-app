import classNames from "classnames";
import React from "react";

import {
  Button,
  Card,
  IconFilter,
  TextIcon,
  DropdownDialog,
} from "~/components";

import styles from "./styles.module.css";

const DropdownMenu: React.FC<{
  updateAscOrder: (ascOrder: boolean) => any;
}> = ({ updateAscOrder }) => (
  <ul
    role="menu"
    className={classNames(["reset", styles.menu])}
    data-clickable="true"
  >
    <li role="menu-item">
      <Card
        onClick={() => {
          updateAscOrder(true);
        }}
      >
        <span className={styles.item}>Oldest to Newest</span>
      </Card>
    </li>
    <li role="menu-item">
      <Card
        onClick={() => {
          updateAscOrder(false);
        }}
      >
        <span className={styles.item}>Newest to Oldest</span>
      </Card>
    </li>
  </ul>
);

interface Props {
  ascOrder: boolean;
  updateAscOrder: (ascOrder: boolean) => any;
}

export const Sorter: React.FC<Props> = ({ ascOrder, updateAscOrder }) => {
  return (
    <section className={styles.container} data-clickable>
      <DropdownDialog
        dropdown={{
          content: (
            <DropdownMenu updateAscOrder={(state) => updateAscOrder(state)} />
          ),
          placement: "bottom-start",
        }}
        dialog={{
          title: "Order",
          content: (
            <DropdownMenu updateAscOrder={(state) => updateAscOrder(state)} />
          ),
        }}
      >
        {({ openDialog, ref }) => (
          <Button ref={ref} onClick={openDialog}>
            <TextIcon icon={<IconFilter />} color="grey" spacing="xTight">
              Sort {ascOrder ? "Oldest to Newest" : "Newest to Oldest"}
            </TextIcon>
          </Button>
        )}
      </DropdownDialog>
    </section>
  );
};
