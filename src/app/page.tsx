import { fetchNFTs } from "@/lib/fetchNFTs";
import Image from "next/image";

export default async function Home() {
  const ownerAddr = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const nfts = await fetchNFTs(ownerAddr);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My NFTs</h1>
      {nfts.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {nfts.map((nft, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                width: "200px",
              }}
            >
              {nft.image ? (
                <Image
                  src={nft.image.cachedUrl}
                  alt={nft.name || "NFT"}
                  width={200}
                  height={200}
                  style={{ borderRadius: "10px" }}
                />
              ) : (
                <p>No image available</p>
              )}
              <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                {nft.name || "Untitled NFT"}
              </h3>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Contract: {nft.contract.address}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found.</p>
      )}
    </div>
  );
}
