// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TokenA is ERC20, Ownable{
    constructor() ERC20("DAI Coin", "DAI") Ownable(msg.sender){ 
        console.log("\tI am DAI owner", msg.sender);
    }

    function mint(address to, uint256 _amount) external onlyOwner{
        _mint(to, _amount);
    }
}

