import { useEthers, useContractFunction } from "@usedapp/core";

import { Dialog, MetaMaskButton } from "~/components";
import { useDialogSwitch } from "~/hooks";
import { contract } from "~/utils";

import styles from "./styles.module.css";

type ClaimLogbookDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseClaimLogbookDialog: React.FC<ClaimLogbookDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  const { activateBrowserWallet, account, chainId, library, error } =
    useEthers();

  console.log({ library, error, account, chainId });

  const getLogbook = async () => {
    if (!library) return;

    const result = await contract.connect(library.getSigner()).getLogbook("22");

    console.log(result);
  };

  const { state: publishState, send: publish } = useContractFunction(
    contract,
    "publish"
  );
  const publishContent = async () => {
    const result = await publish("22", "hello world");
    console.log(result);
  };
  console.log({ publishState });

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="Claim Logbook" closeDialog={closeDialog} />

        <Dialog.Content>
          <p className={styles.intro}>
            Logbook 2.0 has just launched. If you own Travloggers, get started
            to claim Logbook 2.0 by connecting wallet. Have no Traveloggers?
            Collect one from <a href="https://opensea.com">OpenSea</a> and be
            part of the community.
          </p>

          <button onClick={() => getLogbook()}>Get Logbook #1</button>
          <button onClick={() => publishContent()}>Publish</button>

          <section className={styles.buttons}>
            <MetaMaskButton onClick={activateBrowserWallet} />
            {/* <WalletConnectButton onClick={activateBrowserWallet} /> */}
          </section>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export const ClaimLogbookDialog = (props: ClaimLogbookDialogProps) => (
  <Dialog.Lazy mounted={<BaseClaimLogbookDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
