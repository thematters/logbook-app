import { ConnectedAccountButton, Dialog } from "~/components";

type ClaimLogbookContentProps = {
  onClaim: (tokenIds: string[]) => void;
  gotoConnectWallet: () => void;
};

const ClaimLogbookContent: React.FC<ClaimLogbookContentProps> = ({
  onClaim,
  gotoConnectWallet,
}) => {
  // fetching Traveloggers

  // unclaimable

  // claimable

  // claiming

  return (
    <>
      <Dialog.Content>
        <p>
          Logbook 2.0 has just launched. If you own Travloggers, get started to
          claim Logbook 2.0 by connecting wallet .
        </p>
        <p> 🎉 1 Logbook available</p>

        <ConnectedAccountButton gotoConnectWallet={gotoConnectWallet} />

        <Dialog.Message type="info">
          To change, switch it directly on your wallet
        </Dialog.Message>
      </Dialog.Content>

      <Dialog.Footer.Button color="green" onClick={() => alert("TODO")}>
        Claim
      </Dialog.Footer.Button>
    </>
  );
};

export default ClaimLogbookContent;
