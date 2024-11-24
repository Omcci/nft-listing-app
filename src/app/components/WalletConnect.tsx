import { walletConnect } from "@/lib/walletConnect";
import { useState } from "react";

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const handleWalletConnect = async () => {
    try {
      const userAddress = await walletConnect();
      setAddress(userAddress);
      setConnected(true);
      onConnect(userAddress);
    } catch (error) {
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div>
      {connected ? (
        <p className="text-green-500">Connected: {address}</p>
      ) : (
        <button
          onClick={handleWalletConnect}
          className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
