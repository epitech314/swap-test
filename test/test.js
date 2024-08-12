const { expect } = require("chai");
const { ethers } = require("hardhat");

const { tokenAContract, tokenBContract, tokenCContract } = require("./utilities");
let dai, busd, dayl, factory, router;
let daiAddress, busdAddress, routerAddress;

describe("Test UniswapV2 Senario", function () {
  before(async () => {
    //get signers
    [owner, _WETH, lpOne, lpTwo, lp3, alice, bob] = await ethers.getSigners();
    console.log("Got Signers");
    console.log("\towner address: ", owner.address);
    console.log("\tWETH address: ", _WETH.address);
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
    const daylAddress = await dayl.getAddress();
    console.log("\tdayl Token Contract deployed at: ", daylAddress);

    console.log("   Factory and Router Contracts");
    const UV2FactoryContract = await ethers.getContractFactory("UV2Factory");
    factory = await UV2FactoryContract.deploy(owner.address); // feeToSetter
    const factoryAddress = await factory.getAddress();
    console.log("\tUV2Factory deployed at: ", factoryAddress);

    const UV2RouterContract = await ethers.getContractFactory("UV2Router");
    router = await UV2RouterContract.deploy(factoryAddress, _WETH.address);
    routerAddress = await router.getAddress();
    console.log("\tUV2Router depoyed at: ", routerAddress);

    // give initial money to alice and bob
    console.log("Give some Tokens by minting");
    await dai.connect(owner).mint(lpOne.address, "10000");
    await busd.connect(owner).mint(lpOne.address, "2000");
    const lpOneDAIBalance = await dai.balanceOf(lpOne.address);
    const lpOneBUSDBalance = await busd.balanceOf(lpOne.address);
    console.log(`\tlpOne has got ${lpOneDAIBalance} DAI and ${lpOneBUSDBalance} BUSD`);

    await dai.connect(owner).mint(lpTwo.address, "20000");
    await busd.connect(owner).mint(lpTwo.address, "2000");
    const lpTwoDAIBalance = await dai.balanceOf(lpTwo.address);
    const lpTwoBUSDBalance = await busd.balanceOf(lpTwo.address);
    console.log(`\tlpTwo has got ${lpTwoDAIBalance} DAI and ${lpTwoBUSDBalance} BUSD`);

    await dai.connect(owner).mint(lp3.address, "20000");
    await busd.connect(owner).mint(lp3.address, "2000");
    const lp3DAIBalance = await dai.balanceOf(lp3.address);
    const lp3BUSDBalance = await busd.balanceOf(lp3.address);
    console.log(`\tlp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);

    dai.connect(owner).mint(alice.address, "10000");
    busd.connect(owner).mint(bob.address, "10000");
  });

  it("Tokens: DAI, BUSD, DAYL", async () => {
    expect(await dai.symbol()).to.equal("DAI");
    expect(await busd.symbol()).to.equal("BUSD");
    expect(await dayl.symbol()).to.equal("DAYL");
  });

  it("lpOne deposit 10000 DAI and 1000 BUSD", async () => {
    await dai.connect(lpOne).approve(routerAddress, "10000");
    await busd.connect(lpOne).approve(routerAddress, "1000");
    await router
      .connect(lpOne)
      .addLiquidity(
        daiAddress,
        busdAddress,
        10000,
        1000,
        9000,
        900,
        lpOne.address,
        Math.floor(Date.now() / 1000 + 120)
      );
    const lpOneDAIBalance = await dai.balanceOf(lpOne.address);
    const lpOneBUSDBalance = await busd.balanceOf(lpOne.address);
    console.log(`\tlpOne has got ${lpOneDAIBalance} DAI and ${lpOneBUSDBalance} BUSD`);
  });

  it("lpTwo deposit 1000 DAI and 100 BUSD", async () => {
    await dai.connect(lpTwo).approve(routerAddress, "1000");
    await busd.connect(lpTwo).approve(routerAddress, "100");
    await router
      .connect(lpTwo)
      .addLiquidity(
        daiAddress,
        busdAddress,
        1000,
        100,
        900,
        90,
        lpTwo.address,
        Math.floor(Date.now() / 1000 + 120)
      );
    const lpTwoDAIBalance = await dai.balanceOf(lpTwo.address);
    const lpTwoBUSDBalance = await busd.balanceOf(lpTwo.address);
    console.log(`\tlpTwo has got ${lpTwoDAIBalance} DAI and ${lpTwoBUSDBalance} BUSD`);
  });

  it("lp3 deposit 1000 DAI and 100 BUSD", async () => {
    await dai.connect(lp3).approve(routerAddress, "1000");
    await busd.connect(lp3).approve(routerAddress, "100");
    await router
      .connect(lp3)
      .addLiquidity(
        daiAddress,
        busdAddress,
        1000,
        100,
        900,
        90,
        lp3.address,
        Math.floor(Date.now() / 1000 + 120)
      );
    const lp3DAIBalance = await dai.balanceOf(lp3.address);
    const lp3BUSDBalance = await busd.balanceOf(lp3.address);
    console.log(`\tlp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);
  });

  it("alice trade", async () => {
    let aliceDAIBalance = await dai.balanceOf(alice.address);
    let aliceBUSDBalance = await busd.balanceOf(alice.address);
    console.log(`\talice has got ${aliceDAIBalance} DAI and ${aliceBUSDBalance} BUSD`);
    await dai.connect(alice).approve(routerAddress, "100");
    await router
      .connect(alice)
      .swapExactTokensForTokens(
        100,
        8,
        [daiAddress, busdAddress],
        alice.address,
        Math.floor(Date.now() / 1000 + 120)
      );
    aliceDAIBalance = await dai.balanceOf(alice.address);
    aliceBUSDBalance = await busd.balanceOf(alice.address);
    console.log(`\talice has got ${aliceDAIBalance} DAI and ${aliceBUSDBalance} BUSD`);
  });

  it("lp3 withdraw", async () => {
    // const pairContract = await ethers.getContractFactory("LPToken");
    // const pairToken = await pairContract.deploy();
    // let lpTokenAddress = await pairToken.getAddress();
    // let lp3LPBalance = await pairToken.balanceOf(lp3.address);
    // console.log("lpTokenAddress: ", lpTokenAddress)
    // console.log("lp3LPBalance: ", lp3LPBalance)
    // let pairAddress = await factory.getPair[daiAddress][busdAddress];
    // console.log("pairAddress: ", pairAddress);
    // await router
    //   .connect(lp3)
    //   .removeLiquidity(
    //     daiAddress,
    //     busdAddress,
    //     158,
    //     450,
    //     45,
    //     lp3.address,
    //     Math.floor(Date.now() / 1000 + 120)
    //   );
    // const lp3DAIBalance = await dai.balanceOf(lp3.address);
    // const lp3BUSDBalance = await busd.balanceOf(lp3.address);
    // console.log(`\tlp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);
  });
});
