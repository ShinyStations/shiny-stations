// SPFX-License-Identifier : MIT 
pragma solidity ^0.8.4; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 
    address contractAddress; //address we want the NFT to interact with 

    constructor(address nftUnlockAddress) ERC721("Metaverse Tokens", "METT") {
        contractAddress = nftUnlockAddress; 

    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true); //approval to transact within other contracts 
        return newItemId; // mint the Token then put it to sale , so wa have to know the Id of the token 
        
    }


}


