import { NFT } from "@/types/NFT";

export interface FetchNFTsResponse {
  ownedNfts: NFT[];
  pageKey?: string;
  totalCount?: number;
}

export async function fetchNFTs(ownerAddr: string): Promise<NFT[]> {
  const apiKey = process.env.ALCHEMY_API_KEY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner/`;
  const fetchURL = `${baseURL}?owner=${ownerAddr}&pageSize=200`;

  const requestOptions = {
    method: "GET",
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(fetchURL, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch NFTs");
    }
    const data: FetchNFTsResponse = await response.json();
    return data.ownedNfts || [];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
