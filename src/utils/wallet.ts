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
