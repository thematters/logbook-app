import { useEthers } from "@usedapp/core";
import { useState } from "react";

import { Dialog } from "~/components";
import { useDialogSwitch, useStep } from "~/hooks";
import ConnectWalletContent from "../ConnectWalletContent";
import ClaimLogbookContent from "./ClaimLogbookContent";
import CompletedContent from "./CompletedContent";

type ClaimLogbookDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

type Step = "connect-wallet" | "claim" | "completed";

const BaseClaimLogbookDialog: React.FC<ClaimLogbookDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  const { account } = useEthers();

  const defaultStep = account ? "claim" : "connect-wallet";
  const { currStep, forward } = useStep<Step>(defaultStep);

  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const onClaim = (tokenIds: string[]) => {
    setTokenIds(tokenIds);
  };

  const isClaim = currStep === "claim";
  const isConnectWallet = currStep === "connect-wallet";
  const isCompleted = currStep === "completed";

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isClaim
              ? "Claim Logbook"
              : isConnectWallet
              ? "Connect Wallet"
              : "Claim successfully 🎉"
          }
          closeDialog={closeDialog}
        />

        {isConnectWallet && (
          <ConnectWalletContent next={() => forward("claim")} />
        )}

        {isClaim && (
          <ClaimLogbookContent
            onClaim={onClaim}
            gotoConnectWallet={() => forward("connect-wallet")}
          />
        )}

        {isCompleted && <CompletedContent tokenIds={tokenIds} />}
      </Dialog>
    </>
  );
};

export const ClaimLogbookDialog = (props: ClaimLogbookDialogProps) => (
  <Dialog.Lazy mounted={<BaseClaimLogbookDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
