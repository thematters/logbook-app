import { useAccount } from "wagmi";

import Link from "next/link";
import { Dialog } from "~/components";

type CompletedContentProps = {
  tokenIds: string[];
};

const CompletedContent: React.FC<CompletedContentProps> = ({ tokenIds }) => {
  const [{ data: accountData }] = useAccount();
  const account = accountData?.address;

  return (
    <>
      <Dialog.Content>
        <p>
          The token ID of your logbooks:
          {tokenIds.map((tokenId) => (
            <Link key={tokenId} href={`/logbook?id=${tokenId}`}>
              <a>&nbsp;#{tokenId}</a>
            </Link>
          ))}
        </p>
      </Dialog.Content>

      <Dialog.Footer.Button
        color="blackLight"
        href={`/bookcase?address=${account}`}
      >
        Check out my bookcase
      </Dialog.Footer.Button>
    </>
  );
};

export default CompletedContent;
