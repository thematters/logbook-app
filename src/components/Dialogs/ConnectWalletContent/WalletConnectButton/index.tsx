import { SelectButton, IconWalletConnect, IconSpinner } from "~/components";

type WalletConnectButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  loading,
  disabled,
  onClick,
}) => (
  <SelectButton
    title="WalletConnect"
    leftIcon={<IconWalletConnect size="xlM" />}
    right={loading ? <IconSpinner /> : null}
    onClick={onClick}
    disabled={disabled || loading}
  />
);

export default WalletConnectButton;
