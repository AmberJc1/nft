import { ethers } from "hardhat";

async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT");
  //TODO：填写NFT名称和符号
  const contract = await MyNFT.deploy(" ", "");

  await contract.waitForDeployment(); // ✅ 替代 .deployed()

  console.log(`✅ Contract deployed to: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
