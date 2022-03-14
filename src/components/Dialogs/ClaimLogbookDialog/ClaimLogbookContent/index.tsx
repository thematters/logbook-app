import { useAccount, useContractRead, useNetwork, useSignMessage } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloError,
  gql,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { ConnectedAccountButton, Spinner, Dialog, Spacer } from "~/components";
import { AlchemyNetwork, getNFTs, logbookInterface } from "~/utils";

import styles from "./styles.module.css";

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === "production";
const OPENSEA_URL = isProd
  ? "https://opensea.io"
  : "https://testnets.opensea.io";

type ClaimLogbookContentProps = {
  onClaim: (tokenIds: string[]) => void;
  gotoConnectWallet: () => void;
};

const GENERATE_SIGNING_MESSAGE = gql`
  mutation GenerateSigningMessage($input: GenerateSigningMessageInput!) {
    generateSigningMessage(input: $input) {
      nonce
      signingMessage
      createdAt
      expiredAt
    }
  }
`;

const CLAIM_LOGBOOKS = gql`
  mutation ClaimLogbooks($input: ClaimLogbooksInput!) {
    claimLogbooks(input: $input) {
      ids
      txHash
    }
  }
`;

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_MATTERS_API_URL,
  cache: new InMemoryCache(),
});

const ClaimLogbookContent: React.FC<ClaimLogbookContentProps> = ({
  onClaim,
  gotoConnectWallet,
}) => {
  const [{ data: accountData }] = useAccount();
  const [__, signMessage] = useSignMessage();
  const [_, ownerOf] = useContractRead(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: logbookInterface,
    },
    "ownerOf"
  );

  const account = accountData?.address;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenIds, setTokenIds] = useState<string[]>([]);

  const [claiming, setClaiming] = useState(false);
  const [claimLogbooks] = useMutation(CLAIM_LOGBOOKS, { client });
  const [generateSigningMessage] = useMutation(GENERATE_SIGNING_MESSAGE, {
    client,
  });

  const getClaimableLogbooks = async (account: string) => {
    setLoading(true);
    setError("");

    // get Traveloggers token ids
    const traveloggersNFTs = (await getNFTs({
      network: isProd ? AlchemyNetwork.Mainnet : AlchemyNetwork.Rinkeby,
      contract: process.env.NEXT_PUBLIC_TRAVELOGGERS_CONTRACT_ADDRESS || "",
      owner: account,
    })) as { ownedNfts: Array<{ id: { tokenId: string } }> };

    const tokenIds = traveloggersNFTs.ownedNfts.map((item) =>
      ethers.BigNumber.from(item.id.tokenId).toString()
    );

    if (tokenIds.length <= 0) {
      setLoading(false);
      setTokenIds([]);
      setError("");
      return;
    }

    // filter unclaimed token ids
    const claimableTokenIds = [];
    for (const tokenId of tokenIds) {
      const { error } = await ownerOf({ args: tokenId });

      const tokenNotExists =
        (error as any)?.reason === "ERC721: owner query for nonexistent token";

      if (tokenNotExists) {
        claimableTokenIds.push(tokenId);
      }
    }

    setLoading(false);
    setTokenIds(claimableTokenIds);
    setError("");
  };

  const claim = async () => {
    setClaiming(true);
    setError("");

    // get signing message
    let signingMessageData: any = {};
    try {
      const result = await generateSigningMessage({
        client,
        variables: {
          input: { address: account, purpose: "claimLogbook" },
        },
      });
      signingMessageData = result.data;
    } catch (err) {
      const error = err as ApolloError;
      setError(error.message);
      setClaiming(false);
      return;
    }

    const signingMessage = signingMessageData?.generateSigningMessage;
    if (!signingMessage) {
      setClaiming(false);
      setError("Failed to generate signing message");
      return;
    }

    // let user sign the message
    const { data: signature, error: signError } = await signMessage({
      message: signingMessage.signingMessage,
    });

    if (signError) {
      setError(signError?.message || "Failed to sign message");
      setClaiming(false);
      return;
    }

    // claim
    let claimData: any = {};
    try {
      const result = await claimLogbooks({
        client,
        variables: {
          input: {
            ethAddress: account,
            signedMessage: signingMessage.signingMessage,
            signature,
            nonce: signingMessage.nonce,
          },
        },
      });
      claimData = result.data;
    } catch (err) {
      const error = err as ApolloError;
      setError(error.message || "Failed to claim logbooks");
      setClaiming(false);
      return;
    }

    const claimedIds = claimData?.claimLogbooks?.ids;

    if (!claimedIds || claimedIds.length <= 0) {
      setClaiming(false);
      setError("No logbooks to claim");
      return;
    }

    onClaim(claimedIds);
    setError("");
    setClaiming(false);
  };

  useEffect(() => {
    if (!account) return;

    getClaimableLogbooks(account);
  }, [account]);

  // fetching Traveloggers
  if (loading) {
    return (
      <Dialog.Content>
        <Spinner />
      </Dialog.Content>
    );
  }

  // unclaimable
  if (tokenIds.length == 0) {
    return (
      <Dialog.Content>
        <p>
          Have no Traveloggers? Collect one from{" "}
          <a
            href="https://opensea.io/collection/traveloggers"
            target="_blank"
            rel="noreferrer"
          >
            OpenSea
          </a>{" "}
          and be part of the community.
        </p>

        <ConnectedAccountButton gotoConnectWallet={gotoConnectWallet} />

        <Spacer size="base" />
      </Dialog.Content>
    );
  }

  //  claimable & claiming
  return (
    <>
      <Dialog.Content>
        <p>
          Logbook 2.0 has just launched. If you own Travloggers, get started to
          claim Logbook 2.0 by connecting wallet .
        </p>

        <ConnectedAccountButton gotoConnectWallet={gotoConnectWallet} />

        {!error && (
          <Dialog.Message type="info">
            To change, switch it directly on your wallet
          </Dialog.Message>
        )}

        {error && <Dialog.Message type="error">{error}</Dialog.Message>}

        {tokenIds.length > 0 && (
          <p className={styles.unclaimHint}>
            🎉 {tokenIds.length} Logbook{tokenIds.length > 1 ? "s" : ""}{" "}
            available:
            {tokenIds.map((tokenId) => (
              <a
                key={tokenId}
                href={`${OPENSEA_URL}/assets/${process.env.NEXT_PUBLIC_TRAVELOGGERS_CONTRACT_ADDRESS}/${tokenId}`}
                target="_blank"
                rel="noreferrer"
              >
                &nbsp;#{tokenId}
              </a>
            ))}
          </p>
        )}
      </Dialog.Content>

      <Dialog.Footer.Button color="green" onClick={claim} disabled={!!error}>
        {claiming ? <Spinner /> : "Claim"}
      </Dialog.Footer.Button>
    </>
  );
};

export default ClaimLogbookContent;
