// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0 <0.9.0;

import '@uniswap/v2-core/contracts/UniswapV2Factory.sol';

contract UV2Factory is UniswapV2Factory{
    constructor(address _feeToSetter) UniswapV2Factory(_feeToSetter) public{}
}

