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

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header title="Claim Logbook" closeDialog={closeDialog} />

        <p>
          Logbook 2.0 has just launched. If you own Travloggers, get started to
          claim Logbook 2.0 by connecting wallet. Have no Traveloggers? Collect
          one from OpenSea and be part of the community.
        </p>

        <Dialog.Footer>
          <Button>MetaMask</Button>
          <Button>WalletConnect</Button>
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
