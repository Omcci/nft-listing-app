import { walletConnect } from "@/lib/walletConnect";
import { useState } from "react";

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleWalletConnect = async () => {
    setLoading(true);
    setError("");

    try {
      const { address: userAddress } = await walletConnect();
      setAddress(userAddress || "");
      setConnected(true);
      onConnect(userAddress || "");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect">
      {connected ? (
        <p className="text-green-500">
          <strong>Connected:</strong> {address}
        </p>
      ) : (
        <>
          <button
            onClick={handleWalletConnect}
            disabled={loading}
            className={`bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
