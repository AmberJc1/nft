import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    "base-sepolia": {
      url: "https://sepolia.base.org", // 你也可以使用 Alchemy/Infura 的 RPC
      accounts: [process.env.PRIVATE_KEY!], // 确保 .env 中有 PRIVATE_KEY
    },
    base: {
      url: "https://mainnet.base.org", // 主网，测试网用 base-goerli
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;