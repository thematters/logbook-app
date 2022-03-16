import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

import { Dialog } from "~/components";
import { useDialogSwitch } from "~/hooks";

import styles from "./styles.module.css";

interface DialogProps {
  hash: string;
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
}

const BaseDialog: React.FC<DialogProps> = ({ hash, children }) => {
  const [{ data: dataWait, loading: waitForTransaction }, wait] =
    useWaitForTransaction({
      hash,
      confirmations: 3,
      skip: true,
    });

  const { show, openDialog, closeDialog } = useDialogSwitch(true);

  useEffect(() => {
    if (hash) wait({ hash }).then((data) => console.log("wait data:", data));
  }, [hash]);

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Content>
          {!hash ? (
            <p className={styles.text}>
              waiting for transaction{" "}
              {hash && <a href="">polygon/link/{hash}</a>}
            </p>
          ) : (
            <p className={styles.text}>Publish successfully🎉</p>
          )}
        </Dialog.Content>

        <Dialog.Footer.Button
          textColor="black"
          bgColor="greyLighter"
          onClick={closeDialog}
        >
          Back to Logbook
        </Dialog.Footer.Button>
      </Dialog>
    </>
  );
};

export const WaitCompleteDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
