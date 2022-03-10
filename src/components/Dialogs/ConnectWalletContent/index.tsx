import { useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import { Dialog, Spacer } from "~/components";
import MetaMaskButton from "./MetaMaskButton";

import styles from "./styles.module.css";

type ConnectWalletContentProps = {
  next: () => void;
};

const ConnectWalletContent: React.FC<ConnectWalletContentProps> = ({
  next,
}) => {
  const [activateError, setActivateError] = useState("");
  const { activateBrowserWallet, account, error } = useEthers();

  // go forward if wallet is connected
  useEffect(() => {
    if (!account) {
      return;
    }

    next();
  }, [account]);

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  return (
    <Dialog.Content>
      <p>Select a wallet, or register a new wallet</p>

      <section className={styles.buttons}>
        <MetaMaskButton onClick={activateBrowserWallet} />
      </section>

      {error && (
        <Dialog.Message type="error">
          <p>{activateError}</p>
        </Dialog.Message>
      )}

      <Spacer size="base" />
    </Dialog.Content>
  );
};

export default ConnectWalletContent;
