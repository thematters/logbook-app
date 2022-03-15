import { useState } from "react";
import { useAccount } from "wagmi";

import { Dialog } from "~/components";
import { useDialogSwitch, useStep } from "~/hooks";
import ConnectWalletContent from "../ConnectWalletContent";

type ConnectWalletDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseConnectWalletDialog: React.FC<ConnectWalletDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  // const [{ data: accountData }] = useAccount({
  //   fetchEns: true,
  // });

  return (
    <>
      {children({ openDialog })}
      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="Connect Wallet" closeDialog={closeDialog} />
        <ConnectWalletContent
          next={() => console.log("connect wallet successful")}
        />
      </Dialog>
    </>
  );
};

export const ConnectWalletDialog = (props: ConnectWalletDialogProps) => (
  <Dialog.Lazy mounted={<BaseConnectWalletDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
