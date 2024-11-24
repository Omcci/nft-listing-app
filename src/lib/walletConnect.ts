import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function walletConnect(): Promise<{
  success: boolean;
  address?: string;
  message: string;
}> {
  try {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "INFURA_ID",
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
      providerOptions,
    });
    console.log("Opening wallet modal...");
    const connection = await web3Modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    console.log("Wallet connected successfully:", userAddress);

    return {
      success: true,
      address: userAddress,
      message: "Wallet connected successfully!",
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return {
      success: false,
      message: "Failed to connect wallet. Please try again.",
    };
  }
}
