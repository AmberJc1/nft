import { ethers } from "hardhat";

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");

  const contract = await MyNFT.deploy("XYZPass", "XYZ");

  await contract.waitForDeployment(); // ✅ 替代 .deployed()

  console.log(`✅ Contract deployed to: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
