export interface NFTMedia {
  gateway: string;
  raw: string;
}

export interface NFTContract {
  address: string;
}

export interface NFTId {
  tokenId: string;
  tokenMetadata: {
    tokenType: string;
  };
}

export interface NFT {
  contract: NFTContract;
  id: NFTId;
  title?: string;
  description?: string;
  metadata?: Record<string, any>;
  media?: NFTMedia[];
}
