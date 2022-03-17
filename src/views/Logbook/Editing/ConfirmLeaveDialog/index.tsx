import { Button, Dialog, TextIcon } from "~/components";
import { useDialogSwitch } from "~/hooks";

import styles from "./styles.module.css";

interface DialogProps {
  // onConfirm: () => void;
  onLeave: () => void;
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
}

const BaseDialog: React.FC<DialogProps> = ({
  // onConfirm,
  onLeave,
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="Leave" closeDialog={closeDialog} />
        <Dialog.Content>
          <p className={styles.text}>
            Content you written will only be stored in your browser. Do you want
            to leave this page?
          </p>
        </Dialog.Content>
        <Dialog.Footer>
          <section className={styles.buttons}>
            <Button
              width="16rem"
              height="3rem"
              bgColor="greyLighter"
              borderRadius="5rem"
              onClick={onLeave}
            >
              <TextIcon color="black">Leave</TextIcon>
            </Button>
            <Button
              width="16rem"
              height="3rem"
              bgColor="blueGreen"
              borderRadius="5rem"
              onClick={closeDialog}
            >
              <TextIcon color="white">Keep editing</TextIcon>
            </Button>
          </section>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const ConfirmLeaveDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
