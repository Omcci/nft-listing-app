import { NFT } from "@/types/NFT";

export async function fetchNFTs(ownerAddr: string): Promise<NFT[]> {
  const fetchURL = `/api/fetchNFTs?ownerAddr=${ownerAddr}`;

  try {
    const response = await fetch(fetchURL, { method: "GET" });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch NFTs: ${response.status} - ${errorText}`
      );
    }

    const nfts: NFT[] = await response.json();
    return nfts || [];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}
