import { SelectButton, IconMetaMask, IconSpinner } from "~/components";

type MetaMaskButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  loading,
  disabled,
  onClick,
}) => (
  <SelectButton
    title="MetaMask"
    leftIcon={<IconMetaMask size="xlM" />}
    right={loading ? <IconSpinner /> : null}
    onClick={onClick}
    disabled={disabled || loading}
  />
);

export default MetaMaskButton;
