
const hre = require("hardhat");

async function main() {
  
  const NFTUnlock = await hre.ethers.getContractFactory("NFTUnlock");
  const nftUnlock = await NFTUnlock.deploy();
  await nftUnlock.deployed();
  console.log("nftUnlock deployed to:", nftUnlock.address); 


  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftUnlock.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address); 


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
