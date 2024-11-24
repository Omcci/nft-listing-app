import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";

export async function walletConnect(): Promise<{
  success: boolean;
  address?: string;
  message: string;
}> {
  try {
    const web3Modal = new Web3Modal();
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
