'use client';

import { fetchNFTs } from "@/lib/fetchNFTs";
import { NFT } from "@/types/NFT";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [ownerAddr, setOwnerAddr] = useState<string>("");
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchNFTs = () => {
    if (ownerAddr) {
      setLoading(true);
      fetchNFTs(ownerAddr).then((nfts) => {
        setNFTs(nfts);
        setLoading(false);
      });
    }
  }

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">My NFTs</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter wallet address"
          className="border rounded-md px-4 py-2 w-full sm:w-2/3"
          value={ownerAddr}
          onChange={(e) => setOwnerAddr(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          onClick={handleFetchNFTs}
          disabled={loading || !ownerAddr}
        >
          {loading ? "Loading..." : "Fetch NFTs"}
        </button>
      </div>
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
                  className="rounded-lg h-auto"
                />
              ) : (
                <p className="text-sm text-gray-500">No image available</p>
              )}
              <h3 className="text-xl font-black mt-4 mb-2 text-gray-900 dark:text-gray-100">
                {nft.name || "Untitled NFT"}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 break-words">
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
