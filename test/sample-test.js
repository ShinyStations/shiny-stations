const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTUnlock", function () {
  it("Should create and execute Unlocks", async function () {
    const Lock = await ethers.getContractFactory("NFTUnlock")
    const lock = await Lock.deploy()
    await lock.deployed()
    const lockAddress = lock.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(lockAddress)
    await nft.deployed()
    const nftContractAddress = nft.address 

    let listingPrice = await lock.getListingPrice()
    listingPrice = listingPrice.toString()

    // how much are we selling our items for ?
    const auctionPrice = ethers.utils.parseUnits('0.001', 'ether')

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    await lock.createLockItem(nftContractAddress, 1, auctionPrice, {value: listingPrice})
    await lock.createLockItem(nftContractAddress, 2, auctionPrice, {value: listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    await lock.connect(buyerAddress).createLockSale(nftContractAddress, 1, {value: auctionPrice})

    let items = await lock.fetchUnlockItems()

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price : i.price.toString(),
        tokenId: i.tokenId.toString(), 
        seller: i.seller,
        owner: i.owner,
        tokenUri 
      }
      console.log(item)

      return items 


    }))

    console.log('items: ', items)



  });
});
