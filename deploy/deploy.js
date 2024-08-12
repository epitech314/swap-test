const { expect } = require("chai");
const { ethers } = require("hardhat");
const { utils } = require("ethers");

const { tokenAContract, tokenBContract, tokenCContract } = require("./utils");
let dai, busd, dayl, factory, router, weth;
let daiAddress, busdAddress, daylAddress, factoryAddress, routerAddress, wethAddress;

async function main() {
  //get signers
  [owner, wethOwner, lpOne, lpTwo, lp3, alice, bob] = await ethers.getSigners();
  console.log("Got Signers");
  console.log("\towner address: ", owner.address);
  console.log("\tWETH address: ", wethOwner.address);
  console.log("\talice address: ", alice.address);
  console.log("\tbob address: ", bob.address);

  //deploy contracts
  const timeNow = (await ethers.provider.getBlock("latest")).timestamp;
  console.log("Deploying Contracts: [block time now:", new Date(timeNow * 1000), "]");

  console.log("   Token Contracts");
  dai = await tokenAContract(owner);
  daiAddress = await dai.getAddress();
  console.log("\tdai Token Contract deployed at: ", daiAddress);

  busd = await tokenBContract(owner);
  busdAddress = await busd.getAddress();
  console.log("\tbusd Token Contract deployed at: ", busdAddress);

  dayl = await tokenCContract(owner);
  daylAddress = await dayl.getAddress();
  console.log("\tdayl Token Contract deployed at: ", daylAddress);

  console.log("  WETH, Factory and Router Contracts");
  const WETHContract = await ethers.getContractFactory("WETH");
  weth = await WETHContract.connect(wethOwner).deploy();
  wethAddress = await weth.getAddress();
  console.log("\tWETH deployed at: ", wethAddress);

  const UV2FactoryContract = await ethers.getContractFactory("UV2Factory");
  factory = await UV2FactoryContract.deploy(owner.address); // feeToSetter
  factoryAddress = await factory.getAddress();
  console.log("\tUV2Factory deployed at: ", factoryAddress);

  const UV2RouterContract = await ethers.getContractFactory("UV2Router");
  router = await UV2RouterContract.deploy(factoryAddress, wethAddress);
  routerAddress = await router.getAddress();
  console.log("\tUV2Router depoyed at: ", routerAddress);

  // give initial money to alice and bob
  console.log("Give some Tokens by minting");
  await dai.connect(owner).mint(lpOne.address, "10000");
  await busd.connect(owner).mint(lpOne.address, "2000");
  let lpOneDAIBalance = await dai.balanceOf(lpOne.address);
  let lpOneBUSDBalance = await busd.balanceOf(lpOne.address);
  console.log(`\tlpOne has got ${lpOneDAIBalance} DAI and ${lpOneBUSDBalance} BUSD`);

  await busd.connect(owner).mint(lpTwo.address, "1000");
  await dayl.connect(owner).mint(lpTwo.address, "50000");
  await weth.connect(wethOwner).mint(lpTwo.address, ethers.parseEther("10"));
  const lpTwoBUSDBalance = await busd.balanceOf(lpTwo.address);
  const lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  const lpTwoWETHBalance = await weth.balanceOf(lpTwo.address);
  console.log(`\tlpTwo has got ${lpTwoDAYLBalance} DAYL, ${lpTwoBUSDBalance} BUSD and ${ethers.formatEther(lpTwoWETHBalance)} WETH`);

  await dai.connect(owner).mint(lp3.address, "20000");
  await busd.connect(owner).mint(lp3.address, "2000");
  const lp3DAIBalance = await dai.balanceOf(lp3.address);
  const lp3BUSDBalance = await busd.balanceOf(lp3.address);
  console.log(`\tlp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);

  await dai.connect(owner).mint(alice.address, "10000");
  await busd.connect(owner).mint(bob.address, "10000");

  //save files
  saveFrontendFiles();
}

async function saveFrontendFiles() {
  const fs = require("fs");
  const path = require("path");

  const dir = path.join(__dirname, "..", "contractInfo");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path.join(dir, "contract-addresses.json"),
    JSON.stringify(
      {
        dai: daiAddress,
        busd: busdAddress,
        dayl: daylAddress,
        factory: factoryAddress,
        router: routerAddress,
        weth: wethAddress,
      },
      undefined,
      2
    )
  );

  console.log("\tcontract adresses saved in", dir, "\\contractAddresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
