export interface NFTImage {
  cachedUrl: string;
  thumbnailUrl: string;
  pngUrl?: string;
  contentType?: string;
  size?: number;
}

export interface NFTContract {
  address: string;
  name: string;
  symbol?: string;
  totalSupply?: string;
  tokenType: string;
}

export interface NFT {
  contract: NFTContract;
  tokenId: string;
  tokenType: string;
  name?: string;
  description?: string;
  image?: NFTImage;
  collection?: {
    name: string;
    slug?: string;
    externalUrl?: string | null;
    bannerImageUrl?: string | null;
  };
}

export interface FetchNFTsResponse {
  ownedNfts: NFT[];
  total: number;
}
