import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

const {
  DEPLOYER_PRIVATE_KEY,
  BASE_RPC_URL,
  BASE_SEPOLIA_RPC_URL,
  BASESCAN_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    ...(BASE_RPC_URL && DEPLOYER_PRIVATE_KEY
      ? {
          base: {
            url: BASE_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY],
            chainId: 8453,
          },
        }
      : {}),
    ...(BASE_SEPOLIA_RPC_URL && DEPLOYER_PRIVATE_KEY
      ? {
          baseSepolia: {
            url: BASE_SEPOLIA_RPC_URL,
            accounts: [DEPLOYER_PRIVATE_KEY],
            chainId: 84532,
          },
        }
      : {}),
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_API_KEY ?? "",
      baseSepolia: BASESCAN_API_KEY ?? "",
    },
  },
};

export default config;


