import { useAccount } from "wagmi";

import { Dialog } from "~/components";
import { useDialogSwitch, useStep } from "~/hooks";

import ConnectWalletContent from "../ConnectWalletContent";
import { InputAddressContent } from "./InputAddressContent";

type DialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

type Step = "connect-wallet" | "input-address" | "completed";

const BaseDialog: React.FC<DialogProps> = ({ children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  const [{ data: accountData }] = useAccount();
  const account = accountData?.address;

  const defaultStep = account ? "input-address" : "connect-wallet";
  const { currStep, forward } = useStep<Step>(defaultStep);

  const isConnectWallet = currStep === "connect-wallet";
  const isInputAddress = currStep === "input-address";
  const isCompleted = currStep === "completed";

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={isCompleted ? "Transferred successfully" : "Transfer Logbook"}
          closeDialog={closeDialog}
        />

        {isConnectWallet && (
          <ConnectWalletContent next={() => forward("input-address")} />
        )}

        {isInputAddress && (
          <InputAddressContent
            tokenId="123"
            next={() => forward("completed")}
          />
        )}

        {isCompleted && (
          <>
            <Dialog.Content>
              <p>
                Your friend can view Logbook in their collection, and access or
                edit the Logbook.
              </p>
            </Dialog.Content>

            <Dialog.Footer.Button
              textColor="black"
              bgColor="greyLighter"
              onClick={closeDialog}
            >
              Got it
            </Dialog.Footer.Button>
          </>
        )}
      </Dialog>
    </>
  );
};

export const GiftTransferDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
