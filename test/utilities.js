const { ethers } = require("hardhat");

exports.tokenAContract = async function (deployer) {
	const DAIContract = await ethers.getContractFactory("TokenA", {
		signer: deployer,
	});

	const dai = await DAIContract.connect(deployer).deploy();

	return dai;
};

exports.tokenBContract = async function (deployer) {
	const BUSDContract = await ethers.getContractFactory("TokenB", {
		signer: deployer,
	});

	const busd = await BUSDContract.connect(deployer).deploy();

	return busd;
};

exports.tokenCContract = async function (deployer) {
	const DAYLContract = await ethers.getContractFactory("TokenC", {
		signer: deployer,
	});

	const dayl = await DAYLContract.connect(deployer).deploy();

	return dayl;
};