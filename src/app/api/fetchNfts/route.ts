import { FetchNFTsResponse, NFT } from "@/types/NFT";
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

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: API key is missing!" },
      { status: 500 }
    );
  }

  const alchemyUrl = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner/?owner=${ownerAddr}&pageSize=200`;

  try {
    const response = await fetch(alchemyUrl);

    if (!response.ok) {
      throw new Error(`Alchemy API responded with ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
