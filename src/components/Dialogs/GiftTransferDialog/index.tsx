import { useEthers } from "@usedapp/core";

import { Dialog } from "~/components";
import { useDialogSwitch, useStep } from "~/hooks";

import { ChooseNetworkContent } from "./ChooseNetworkContent";
import { InputAddressContent } from "./InputAddressContent";

type DialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

type Step = "choose-network" | "input-address" | "completed";

const BaseDialog: React.FC<DialogProps> = ({ children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  const { account } = useEthers();

  const { currStep, forward, back, reset } = useStep<Step>("input-address");

  const isChooseNetwork = currStep === "choose-network";
  const isInputAddress = currStep === "input-address";
  const isCompleted = currStep === "completed";

  const closeToReset = () => {
    closeDialog();
    // setTimeout(() => reset("input-address"), 0);
  };

  return (
    <>
      {children({
        openDialog() {
          reset("input-address");
          openDialog();
        },
      })}

      <Dialog isOpen={show} onDismiss={closeToReset}>
        <Dialog.Header
          title={isCompleted ? "Transferred successfully" : "Transfer Logbook"}
          closeDialog={closeToReset}
        />

        {isChooseNetwork && (
          <ChooseNetworkContent next={() => forward("input-address")} />
        )}

        {isInputAddress && (
          <InputAddressContent
            account={account as string}
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
              // bgActiveColor="greyLighter"
              onClick={closeToReset}
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
