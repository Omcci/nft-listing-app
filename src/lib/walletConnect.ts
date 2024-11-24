import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";

export async function walletConnect(): Promise<string> {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new Web3Provider(connection);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    return userAddress;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw new Error("Failed to connect wallet.");
  }
}
