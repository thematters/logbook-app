import { AlchemyProvider } from "@ethersproject/providers";

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === "production";

export const alchemyProvider = new AlchemyProvider(
  isProd ? "mainnet" : "rinkeby",
  process.env.NEXT_PUBLIC_ALCHEMY_KEY
);
