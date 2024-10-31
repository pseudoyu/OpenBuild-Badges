import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { badgeAbi } from "./contracts/abi";

// Load environment variables
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Validations for environment variables
if (!privateKey || !rpcUrl || !contractAddress) {
  throw new Error(
    "Missing environment variables: Please set PRIVATE_KEY, RPC_URL, and CONTRACT_ADDRESS in your .env file"
  );
}

// Initialize the public client
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl),
});

// Initialize the wallet client
const account = privateKeyToAccount(
  `0x${privateKey}`
) as unknown as `0x${string}`;
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(rpcUrl),
});

// Function to mint a badge
export async function mintBadge(recipientAddress: `0x${string}`) {
  try {
    // Prepare the transaction
    const { request } = await publicClient.simulateContract({
      account,
      address: contractAddress as `0x${string}`,
      abi: badgeAbi,
      functionName: "mintBadge",
      args: [recipientAddress],
    });

    // Send the transaction
    const hash = await walletClient.writeContract(request);

    // Wait for the transaction to be mined
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    console.log("Badge minted successfully!");
    console.log("Transaction hash:", hash);
    console.log("Block number:", receipt.blockNumber);

    return {
      success: true,
      transactionHash: hash,
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    console.error("Error minting badge:", error);
    return { success: false, error: (error as Error).message };
  }
}

// Function to get all badges
export async function getAllBadges() {
  try {
    const badges = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: badgeAbi,
      functionName: "getAllBadges",
    });

    return {
      success: true,
      badges: badges.map(badge => ({
        tokenId: badge.tokenId,
        owner: badge.owner,
        mintTime: badge.mintTime
      }))
    };
  } catch (error) {
    console.error("Error fetching badges:", error);
    return { success: false, error: (error as Error).message };
  }
}
