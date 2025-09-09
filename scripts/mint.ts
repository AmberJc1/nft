import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x90ccB4A90Fd5baD5389590331F2A6edD92BA1375"; // 你的合约地址
  const recipients = [
    //TODO：填写接收者地址
  ];
  //TODO：填写元数据链接（可以用这个“ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i”）
  const tokenURI = ""; // 固定元数据链接

  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  for (const recipient of recipients) {
    const tx = await MyNFT.mintTo(recipient, tokenURI);
    await tx.wait();
    console.log(`✅ 成功发送 NFT 给 ${recipient}`);
  }

  console.log("🎉 所有接收者已成功获得 NFT");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

//1. 收集地址
//2. 导入到mint.ts
//3.执行脚本npx hardhat run scripts/mint.ts --network base