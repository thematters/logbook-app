import { fetchWrapper } from "./fetch";

export enum AlchemyNetwork {
  Mainnet = "eth-mainnet",
  Rinkeby = "eth-rinkeby",
  PolygonMainnet = "polygon-mainnet.g",
  PolygonMumbai = "polygon-mumbai.g",
}

export const getAlchemyAPIURL = (network: AlchemyNetwork) =>
  `https://${network}.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const getNFTs = async ({
  network,
  owner,
  contract,
  withMetadata = false,
}: {
  network: AlchemyNetwork;
  owner: string;
  contract: string;
  withMetadata?: boolean;
}) => {
  const baseURL = `${getAlchemyAPIURL(network)}/getNFTs/`;

  const result = await fetchWrapper.get(
    `${baseURL}?owner=${owner}&contractAddresses[]=${contract}&withMetadata=${withMetadata}`
  );

  return result;
};
