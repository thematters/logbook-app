import { useEthers, getChainName, shortenAddress } from "@usedapp/core";
import { useEffect } from "react";
import {
  SelectButton,
  TextIcon,
  IconIndicator,
  IconWallet,
} from "~/components";

type ConnectedAccountButtonProps = {
  gotoConnectWallet: () => void;
};

export const ConnectedAccountButton: React.FC<ConnectedAccountButtonProps> = ({
  gotoConnectWallet,
}) => {
  const { account, chainId } = useEthers();

  useEffect(() => {
    if (!account) {
      gotoConnectWallet();
    }
  }, [account]);

  return (
    <SelectButton
      title={account ? shortenAddress(account) : ""}
      subtitle={
        <TextIcon
          icon={<IconIndicator color="green" size="xxs" />}
          spacing="xxTight"
        >
          {chainId ? getChainName(chainId) : ""}
        </TextIcon>
      }
      leftIcon={<IconWallet size="xlM" />}
      disabled
    />
  );
};
