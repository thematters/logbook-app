import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

import { Dialog, Spinner } from "~/components";
import { useDialogSwitch } from "~/hooks";
import { toPolygonHashUrl } from "~/utils";

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

  const hashLink = (
    <>
      Transaction details:&nbsp;
      <a href={toPolygonHashUrl(hash)} target="_blank" rel="noreferrer">
        link
      </a>
    </>
  );

  return (
    <>
      {children({ openDialog, closeDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Content>
          {!hash ? (
            <p className={styles.text}>
              Waiting for publishing...
              <br />
              Please check out your wallet dialog
            </p>
          ) : hash && waitForTransaction ? (
            <p className={styles.text}>
              Waiting for confirmation... {dataWait?.confirmations}
              <br />
              {hashLink}
            </p>
          ) : (
            <p className={styles.text}>
              Publish successfully🎉 <br />
              {hashLink}
            </p>
          )}
        </Dialog.Content>

        <Dialog.Footer.Button
          textColor="black"
          bgColor="greyLighter"
          // onClick={closeDialog}
          htmlHref={`/logbook/?id=${id}`}
        >
          {waitForTransaction ? <Spinner /> : <>Back to Logbook</>}
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
