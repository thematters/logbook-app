import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import Link from "next/link";

import { Dialog } from "~/components";
import { useDialogSwitch } from "~/hooks";

import styles from "./styles.module.css";

interface DialogProps {
  id: string;
  hash: string;
  children: ({
    openDialog,
    closeDialog,
  }: {
    openDialog: () => void;
    closeDialog?: () => void;
  }) => React.ReactNode;
}

const BaseDialog: React.FC<DialogProps> = ({ id, hash, children }) => {
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
      {children({ openDialog, closeDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Content>
          {!hash ? (
            <p className={styles.text}>waiting for publishing</p>
          ) : hash && waitForTransaction ? (
            <p className={styles.text}>
              waiting for confirmation:{" "}
              <a href={`https://mumbai.polygonscan.com/tx/${hash}`}>link</a>
            </p>
          ) : (
            <p className={styles.text}>
              Published successfully🎉{" "}
              <a href={`https://mumbai.polygonscan.com/tx/${hash}`}>link</a>
            </p>
          )}
        </Dialog.Content>

        <Dialog.Footer.Button
          textColor="black"
          bgColor="greyLighter"
          // onClick={closeDialog}
          htmlHref={`/logbook/?id=${id}`}
        >
          Back to Logbook
        </Dialog.Footer.Button>
      </Dialog>
    </>
  );
};

export const WaitCompleteDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog, closeDialog }) => (
      <>{props.children({ openDialog, closeDialog })}</>
    )}
  </Dialog.Lazy>
);
