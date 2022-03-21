import { useAccount, chain, useNetwork } from "wagmi";
import { useEffect } from "react";
import {
  SelectButton,
  TextIcon,
  IconIndicator,
  IconWallet,
} from "~/components";
import { maskAddress } from "~/utils";

type ConnectedAccountButtonProps = {
  gotoConnectWallet: () => void;
};

export const ConnectedAccountButton: React.FC<ConnectedAccountButtonProps> = ({
  gotoConnectWallet,
}) => {
  const [{ data: networkData }] = useNetwork();
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const ensName = accountData?.ens?.name;
  const account = accountData?.address;
  const chainName = networkData.chain?.name;

  useEffect(() => {
    if (!account) {
      gotoConnectWallet();
    }
  }, [account, gotoConnectWallet]);

  return (
    <SelectButton
      title={ensName ? ensName : account ? maskAddress(account) : ""}
      subtitle={
        chainName ? (
          <TextIcon
            icon={<IconIndicator color="green" size="xxs" />}
            spacing="xxTight"
          >
            {chainName}
          </TextIcon>
        ) : null
      }
      leftIcon={<IconWallet size="xlM" />}
      disabled
    />
  );
};
