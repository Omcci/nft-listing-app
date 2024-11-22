import { fetchNFTs } from "@/lib/fetchNFTs";
import Image from "next/image";

export default async function Home() {
  const ownerAddr = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const nfts = await fetchNFTs(ownerAddr);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">My NFTs</h1>
      {nfts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
            >
              {nft.image?.cachedUrl ? (
                <Image
                  src={nft.image.cachedUrl}
                  alt={nft.name || "NFT"}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <p className="text-sm text-gray-500">No image available</p>
              )}
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-gray-100">
                {nft.name || "Untitled NFT"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contract: {nft.contract.address}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No NFTs found.</p>
      )}
    </div>
  );
}
