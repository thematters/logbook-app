import { Dialog, Button } from "~/components";
import { useDialogSwitch } from "~/hooks";

type ClaimLogbookDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseClaimLogbookDialog: React.FC<ClaimLogbookDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="Claim Logbook" closeDialog={closeDialog} />

        <Dialog.Content>
          <p>
            Logbook 2.0 has just launched. If you own Travloggers, get started
            to claim Logbook 2.0 by connecting wallet. Have no Traveloggers?
            Collect one from OpenSea and be part of the community.
          </p>
        </Dialog.Content>

        <Dialog.Footer>
          <Dialog.Footer.Button>MetaMask</Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const ClaimLogbookDialog = (props: ClaimLogbookDialogProps) => (
  <Dialog.Lazy mounted={<BaseClaimLogbookDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
