const hre = require('hardhat')

async function main() {
  const NFT = await hre.ethers.getContractFactory('NFT')
  const nft = await NFT.deploy(nftMarket.address)
  await nft.deployed()
  console.log('nft deployed to: ', nft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
