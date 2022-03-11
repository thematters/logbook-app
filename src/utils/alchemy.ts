import axios from "axios";

export enum AlchemyNetwork {
  Mainnet = "eth-mainnet",
  Rinkeby = "eth-rinkeby",
  PolygonMainnet = "polygon-mainnet.g",
  PolygonMumbai = "polygon-mumbai.g",
}

export const getAlchemyAPIURL = (network: AlchemyNetwork) =>
  `https://${network}.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const getAlchemyRPCURL = (network: AlchemyNetwork) =>
  `https://${network}.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

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

  const result = await axios({
    method: "get",
    url: `${baseURL}?owner=${owner}&contractAddresses[]=${contract}&withMetadata=${withMetadata}`,
  });

  return result.data;
};
