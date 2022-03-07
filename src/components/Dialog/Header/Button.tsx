import { Button, IconCross, TextIcon } from "~/components";
import { useResponsive } from "~/hooks";

interface CloseButtonProps {
  closeDialog: () => void;
}

export const CloseButton = ({ closeDialog }: CloseButtonProps) => {
  const isSmallUp = useResponsive("sm-up");

  return (
    <Button
      onClick={closeDialog}
      aria-label="cancel"
      bgColor={isSmallUp ? "greenLighter" : undefined}
      size={isSmallUp ? ["2rem", "2rem"] : undefined}
    >
      {!isSmallUp && (
        <TextIcon color="blueGreen" size="md">
          Cancel
        </TextIcon>
      )}
      {isSmallUp && <IconCross size="lg" />}
    </Button>
  );
};
