// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
        Ownable(msg.sender) // ✅ 指定合约部署者为初始 owner
    {}

    uint256 private _tokenIds;

    function mintTo(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }
}
