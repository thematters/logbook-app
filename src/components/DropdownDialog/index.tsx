import VisuallyHidden from "@reach/visually-hidden";
import React, { forwardRef } from "react";
import FocusLock from "react-focus-lock";

import {
  BaseDialogProps,
  Button,
  Dialog,
  DialogOverlayProps,
  Dropdown,
  PopperProps,
} from "~/components";
import { KEYCODES, Z_INDEX } from "~/enums";
import { useDialogSwitch, useResponsive } from "~/hooks";

type DropdownDialogNode = ({
  openDialog,
  ref,
}: {
  openDialog: () => void;
  ref?: React.Ref<any>;
}) => React.ReactChild | React.ReactChild[];

interface DropdownDialogChildren {
  children: DropdownDialogNode;
}

type DropdownDialogProps = {
  dropdown: Omit<PopperProps, "children">;
  dialog: Omit<BaseDialogProps, keyof DialogOverlayProps> & {
    content: React.ReactNode;
    title: React.ReactNode;
  };
} & DropdownDialogChildren;

type ForwardChildrenProps = {
  openDialog: () => void;
} & DropdownDialogChildren;

const ForwardChildren = forwardRef(
  ({ openDialog, children }: ForwardChildrenProps, ref) => (
    <>{children({ openDialog, ref })}</>
  )
);

export const DropdownDialog = ({
  dropdown,
  dialog,
  children,
}: DropdownDialogProps) => {
  const isSmallUp = useResponsive("sm-up");
  const { show, openDialog, closeDialog } = useDialogSwitch(false);
  const toggle = () => (show ? closeDialog() : openDialog());
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target?.closest && target.closest("[data-clickable], a, button")) {
      closeDialog();
    }
    event.stopPropagation();
  };

  const Content: React.FC = ({ children: contentChildren }) => {
    return (
      <section
        onKeyDown={(event) => {
          if (event.keyCode !== KEYCODES.enter) {
            return;
          }
          closeOnClick(event);
        }}
        onClick={closeOnClick}
      >
        <VisuallyHidden>
          <Button onClick={closeDialog} />
        </VisuallyHidden>

        {contentChildren}
      </section>
    );
  };

  if (isSmallUp) {
    return (
      <Dropdown
        trigger={undefined}
        onHidden={closeDialog}
        onClickOutside={closeDialog}
        visible={show}
        zIndex={Z_INDEX.DIALOG}
        appendTo={document.body}
        {...dropdown}
        content={
          <FocusLock>
            <Content>{dropdown.content}</Content>
          </FocusLock>
        }
      >
        <ForwardChildren openDialog={toggle} children={children} />
      </Dropdown>
    );
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} {...dialog}>
        <Dialog.Header title={dialog.title} closeDialog={closeDialog} />
        <Content>{dialog.content}</Content>
      </Dialog>
    </>
  );
};
