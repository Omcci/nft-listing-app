import { FetchNFTsResponse } from "@/lib/fetchNFTs";
import { NFT } from "@/types/NFT";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerAddr = searchParams.get("ownerAddr");

  if (!ownerAddr) {
    return NextResponse.json(
      { error: "Missing or invalid owner address" },
      { status: 400 }
    );
  }

  const apiKey = process.env.ALCHEMY_API_KEY;
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner/`;
  const fetchURL = `${baseURL}?owner=${ownerAddr}&pageSize=200`;

  try {
    const response = await fetch(fetchURL, { method: "GET" });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to fetch NFTs: ${errorText}` },
        { status: response.status }
      );
    }

    const data: FetchNFTsResponse = await response.json();
    const nftsWithImages = data.ownedNfts.filter(
      (nft: NFT) => nft.image?.cachedUrl
    );

    return NextResponse.json(nftsWithImages);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
