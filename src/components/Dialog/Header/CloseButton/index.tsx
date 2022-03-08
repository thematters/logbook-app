import { Button, IconCross } from "~/components";

interface CloseButtonProps {
  closeDialog: () => void;
}

const CloseButton = ({ closeDialog }: CloseButtonProps) => {
  return (
    <Button
      className="u-sm-down-hide"
      onClick={closeDialog}
      aria-label="cancel"
      bgColor="greenLighter"
      width="2rem"
      height="2rem"
      borderRadius="2rem"
    >
      <IconCross />
    </Button>
  );
};

export default CloseButton;
