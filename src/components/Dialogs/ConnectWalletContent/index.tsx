import { useConnect, useAccount, useNetwork, Connector } from "wagmi";
import React, { useEffect } from "react";

import { Dialog, Spacer } from "~/components";
import MetaMaskButton from "./MetaMaskButton";
import WalletConnectButton from "./WalletConnectButton";

import styles from "./styles.module.css";
import { injectedConnector, walletConnectConnector } from "~/utils";

type ConnectWalletContentProps = {
  next: () => void;
};

const ConnectWalletContent: React.FC<ConnectWalletContentProps> = ({
  next,
}) => {
  const [{ error: connectError }, connect] = useConnect();
  const [{ data: networkData, error: networkError }, switchNetwork] =
    useNetwork();
  const [{ data: accountData }] = useAccount();

  const account = accountData?.address;
  const isUnsupportedNetwork = networkData.chain?.unsupported;
  const currentChainName = networkData.chain?.name;
  const targetChainName = networkData?.chains[0]?.name;
  const targetChainId = networkData?.chains[0]?.id;
  const errorMessage = connectError?.message || networkError?.message;

  const switchToTargetNetwork = () => {
    if (!switchNetwork) return;

    switchNetwork(targetChainId);
  };

  // go forward if wallet is connected
  useEffect(() => {
    if (!account || isUnsupportedNetwork) {
      return;
    }

    next();
  }, [account]);

  return (
    <Dialog.Content>
      <p>Select a wallet, or register a new wallet</p>

      <section className={styles.buttons}>
        <MetaMaskButton onClick={() => connect(injectedConnector)} />
        <WalletConnectButton onClick={() => connect(walletConnectConnector)} />
      </section>

      {isUnsupportedNetwork && (
        <Dialog.Message type="error">
          <p className={styles.unsupportedNetwork}>
            Unsupported network: {currentChainName}.&nbsp;
            <button type="button" onClick={switchToTargetNetwork}>
              Switch to {targetChainName}.
            </button>
          </p>
        </Dialog.Message>
      )}
      {errorMessage && (
        <Dialog.Message type="error">
          <p>{errorMessage ?? "Failed to connect"}</p>
        </Dialog.Message>
      )}

      <Spacer size="base" />
    </Dialog.Content>
  );
};

export default ConnectWalletContent;
