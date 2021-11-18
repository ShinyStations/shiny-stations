// SPFX-License-Identifier : MIT 
pragma solidity ^0.8.4; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; //security control preventing reeantrance 

contract NFTUnlock is ReentrancyGuard {
    using Counters for Counters.Counter; 
    Counters.Counter private _itemIds; 
    Counters.Counter private _itemsSold; // [] : number of items I bought // [] : number of items Sold // mapping and check 

    address payable owner; // who is the owner of this contract ?
    uint256 listingPrice = 0.001 ether; // price of our lock 

    constructor() {
        owner = payable(msg.sender);
    }

    struct UnlockItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }


    mapping(uint256 => UnlockItem) private idToUnlockItem; 

    event UnlockItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) { 
        return listingPrice; //make sure in the front-end it is sending the right amount 
    }

    function createLockItem(
        address nftContract,
        uint256 tokenId,
        uint256 price 
    )   public payable nonReentrant {
        require(price >0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current(); 

        idToUnlockItem[itemId] = UnlockItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false 
        );

        //we transfer the ownership of the NFT to the contract itself 
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId); 

        emit UnlockItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        ); 
    }

    function createLockSale(
        address nftContract,
        uint itemId
    ) public payable nonReentrant {
        uint price = idToUnlockItem[itemId].price; 
        uint tokenId = idToUnlockItem[itemId].tokenId;
        //check the buyer to send the right price we request 
        require(msg.value == price, "Please submit the asking price in order to complete the purchase"); 


        // we transfer the value of the transaction to the seller 
        idToUnlockItem[itemId].seller.transfer(msg.value);                          
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToUnlockItem[itemId].owner = payable(msg.sender);
        idToUnlockItem[itemId].sold = true; 
        _itemsSold.increment(); 
        // we pay the owner of the contract 
        payable(owner).transfer(listingPrice); 
    }

    //return the number of unsold items 
    function fetchUnlockItems() public view returns (UnlockItem[] memory) {
        uint itemCount = _itemIds.current(); 
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current(); 
        uint currentIndex = 0;

        UnlockItem[] memory items = new UnlockItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToUnlockItem[i+1].owner == address(0)) {
                uint currentId = idToUnlockItem[i+1].itemId;
                UnlockItem storage currentItem = idToUnlockItem[currentId]; 
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; 
    }

    // Fetching NFT's that has been purchased 
    function fetchMyNFTs() public view returns (UnlockItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0; 

        for (uint i=0; i< totalItemCount; i++) {
            if (idToUnlockItem[i + 1].owner == msg.sender) {
                itemCount += 1; 
            }
        }

        UnlockItem[] memory items = new UnlockItem[](itemCount);
        for (uint i=0; i< totalItemCount; i++) {
            if (idToUnlockItem[i+1].owner == msg.sender) {
                uint currentId = idToUnlockItem[i+1].itemId;
                UnlockItem storage currentItem = idToUnlockItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns (UnlockItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0 ; 
        uint currentIndex =0; 

         for (uint i=0; i< totalItemCount; i++) {
            if (idToUnlockItem[i + 1].seller == msg.sender) {
                itemCount += 1; 
            }
         }

         UnlockItem[] memory items = new UnlockItem[](itemCount);
        for (uint i=0; i< totalItemCount; i++) {
            if (idToUnlockItem[i + 1].seller == msg.sender) {
                uint currentId = idToUnlockItem[i+1].itemId;
                UnlockItem storage currentItem = idToUnlockItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items; 
    }

}



