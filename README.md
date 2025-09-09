# 🎓 新生零门槛上手：Hardhat + TypeScript NFT 项目

> 目标：从 0 到 1 完成依赖安装、编译、部署合约，并通过脚本批量发放 NFT。  

---

## 目录

    
-   [1\. 项目结构说明](#1-%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E8%AF%B4%E6%98%8E)
    
-   [2\. 一键安装依赖](#2-%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)
    
-   [3\. 配置环境变量 `.env`](#3-%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F-env)
    
-   [4\. 编译合约](#4-%E7%BC%96%E8%AF%91%E5%90%88%E7%BA%A6)
    
-   [5\. 部署合约](#5-%E9%83%A8%E7%BD%B2%E5%90%88%E7%BA%A6)
    
        
-   [6\. 批量 Mint（发放 NFT）](#6-%E6%89%B9%E9%87%8F-mint%E5%8F%91%E6%94%BE-nft)
    
-   [7\. 元数据与图片（tokenURI）](#7-%E5%85%83%E6%95%B0%E6%8D%AE%E4%B8%8E%E5%9B%BE%E7%89%87tokenuri)
    
    
-   [8\. 术语速览](#8-%E6%9C%AF%E8%AF%AD%E9%80%9F%E8%A7%88)
    

---


## 1\. 项目结构说明

```bash
.
├─ contracts/
│  └─ MyNFT.sol              # ERC721 合约（OpenZeppelin）
├─ scripts/
│  ├─ deploy.ts              # 部署脚本（输出合约地址）
│  └─ mint.ts                # 批量发放 NFT 的脚本（需填收件人和 tokenURI）
├─ test/                     # 测试（可选）
├─ typechain-types/          # Typechain 自动生成的类型（安装/编译后出现）
├─ metadata.json             # 示例元数据（可上传到 IPFS）
├─ hardhat.config.ts         # Hardhat 配置（网络/编译器等）
├─ .env                      # 私密变量（私钥、RPC URL 等），切勿提交
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## 2\. 一键安装依赖

```bash
# 克隆项目
git clone <你的仓库地址>
cd <你的仓库目录>

# 安装依赖（任选其一）
npm install
# 或
# pnpm install   # 如果你喜欢 pnpm，需先 npm i -g pnpm
```

---

## 3\. 配置环境变量 `.env`

在项目根目录创建 `.env` 文件（不要提交到 Git）：

```ini
# 私钥（仅测试用的钱包私钥，切勿使用主网资产钱包）
PRIVATE_KEY=0x你的私钥
```

---

## 4\. 编译合约

```bash
npx hardhat compile
```

编译成功后会在 `artifacts/` 和 `typechain-types/` 里生成对应文件。

---

## 5\. 部署合约

### 5.1 部署到base

在 `.env` 中填好 `PRIVATE_KEY`。然后：

```bash
npx hardhat run scripts/deploy.ts --network base
```
---

## 6\. 批量 Mint（发放 NFT）

编辑 `scripts/mint.ts`（**填写接收者列表和 tokenURI**）：

```ts
import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x90ccB4A90Fd5baD5389590331F2A6edD92BA1375"; // 你的合约地址
  const recipients = [
    // TODO：填写接收者地址，例如：
    // "0x1111...","0x2222..."
  ];

  // TODO：填写元数据链接（建议使用 IPFS 链接）
  // 可先用仓库里提供的示例：ipfs://bafkreiar3k5vy66vwe3xlmaoeeyypixtcfzyuxa4qcadpwqixvv4lapm3i
  const tokenURI = "";

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
```

运行：

```bash
# 测试网
npx hardhat run scripts/mint.ts --network base
```

> 注意：合约的 `mintTo` 受 `onlyOwner` 限制，必须用 **部署该合约的同一私钥** 执行脚本。

---

## 7\. 元数据与图片（tokenURI）

-   `tokenURI` 指向一个 **JSON 文件**，描述 NFT 的名字、图片、属性等（常见格式如下）：
    
    ```json
    {
      "name": "XYZ Pass #1",
      "description": "Welcome to XYZ!",
      "image": "ipfs://<图片CID>",
      "attributes": [
        { "trait_type": "Cohort", "value": "2025" }
      ]
    }
    ```
    
-   仓库提供了一个 `metadata.json` 示例，你可以将它上传到 **IPFS**（如 `web3.storage`、`nft.storage`、`Pinata` 等），得到形如 `ipfs://bafy...` 的链接，填到 `tokenURI` 即可。
    
-   批量发不同的 URI：把 `recipients` 与 `tokenURIs` 做成一一对应（或在循环里根据地址拼接不同 URI）。
    

---


## 8\. 术语速览

-   **ERC-721**：最常用的不可分割 NFT 标准。
    
-   **tokenURI**：NFT 的元数据 URL（通常放到 IPFS）。
    
-   **Hardhat 本地链**：开发用本地区块链，端口默认 `8545`。
    
-   **Sepolia**：以太坊测试网，非真实资产。
    
-   **onlyOwner**：OpenZeppelin 的访问控制修饰器，只有合约 owner 可调用函数。
    

---

### 完成打卡清单（交作业用）

-    `npm install` 成功
    
-    `npx hardhat compile` 成功
    
-    部署到 base，并在区块浏览器查看合约与交易
    
-    在 `mint.ts` 填好 `recipients` 与 `tokenURI`，成功发放
    
】
    

---

> ⚠️ 安全提示：**不要把包含真实资产的钱包私钥放入 `.env`**。教学/测试建议使用全新钱包与测试网。祝你第一个 NFT 部署顺利！🚀
