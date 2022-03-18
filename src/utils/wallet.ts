import { chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === "production";

export const supportedChains = isProd
  ? [chain.polygonMainnet]
  : [chain.polygonTestnetMumbai];

export const injectedConnector = new InjectedConnector({
  chains: supportedChains,
  options: { shimDisconnect: true },
});

export const walletConnectConnector = new WalletConnectConnector({
  options: {
    infuraId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
    qrcode: true,
  },
});

export const maskAddress = (address: string, prefixLen: number = 6) => {
  return `${address.substring(0, prefixLen)}...${address.substring(
    address.length - 4
  )}`;
};

export const toPolygonAddressUrl = (address: string) => {
  const domain = isProd ? "polygonscan.com" : "mumbai.polygonscan.com";
  const maskedAddress = maskAddress(address);

  return {
    url: `https://${domain}/address/${address}`,
    address,
    maskedAddress,
  };
};

export const toPolygonHashUrl = (txHash: string) => {
  const domain = isProd ? "polygonscan.com" : "mumbai.polygonscan.com";

  return `https://${domain}/tx/${txHash}`;
};

export const toOpenseaUrl = (id: string) => {
  const OPENSEA_URL = isProd
    ? "https://opensea.io"
    : "https://testnets.opensea.io";

  return `${OPENSEA_URL}/assets/${process.env.NEXT_PUBLIC_TRAVELOGGERS_CONTRACT_ADDRESS}/${id}`;
};
