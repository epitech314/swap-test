const { ethers } = require("hardhat");

let dai, busd, dayl, factory, router;

const ctrAdrs = require("../contractInfo/contract-addresses.json");
const daiAbi = require("../artifacts/contracts/tokens/TokenA.sol/TokenA.json").abi;
const busdAbi = require("../artifacts/contracts/tokens/TokenB.sol/TokenB.json").abi;
const daylAbi = require("../artifacts/contracts/tokens/TokenC.sol/TokenC.json").abi;
const factoryAbi = require("../artifacts/contracts/UV2Factory.sol/UV2Factory.json").abi;
const pairAbi = require("../node_modules/@uniswap/v2-core/build/UniswapV2Pair.json").abi;
const routerAbi = require("../artifacts/contracts/UV2Router.sol/UV2Router.json").abi;
const wethABi = require("../artifacts/contracts/tokens/WETH.sol/WETH.json").abi;
const provider = new ethers.JsonRpcProvider("http://localhost:8545");


async function main() {
  //get signers
  [owner, wethOwner, lpOne, lpTwo, lp3, alice, bob] = await ethers.getSigners();

  //dai
  dai = new ethers.Contract(ctrAdrs.dai, daiAbi, provider);
  //busd
  busd = new ethers.Contract(ctrAdrs.busd, busdAbi, provider);
  //dayl
  dayl = new ethers.Contract(ctrAdrs.dayl, daylAbi, provider);
  //factory
  factory = new ethers.Contract(ctrAdrs.factory, factoryAbi, provider);
  //router
  router = new ethers.Contract(ctrAdrs.router, routerAbi, provider);
  //weth
  weth = new ethers.Contract(ctrAdrs.weth, wethABi, provider);


  //Add liquidity
  // console.log("LPs provide");
  // let lpOneDAIBalance = await dai.balanceOf(lpOne.address);
  // let lpOneBUSDBalance = await busd.balanceOf(lpOne.address);
  // console.log(`  lpOne has got ${lpOneDAIBalance} DAI and ${lpOneBUSDBalance} BUSD`);
  // dai.connect(lpOne).approve(ctrAdrs.router, "10000");
  // busd.connect(lpOne).approve(ctrAdrs.router, "1000");
  // await router
  //   .connect(lpOne)
  //   .addLiquidity(
  //     ctrAdrs.dai,
  //     ctrAdrs.busd,
  //     10000,
  //     1000,
  //     9000,
  //     900,
  //     lpOne.address,
  //     Math.floor(Date.now() / 1000 + 120)
  //   );
  // lpOneDAIBalance = await dai.balanceOf(lpOne.address);
  // lpOneBUSDBalance = await busd.balanceOf(lpOne.address);
  // console.log(`  lpOne has got ${lpOneDAIBalance} DAI and ${lpOneBUSDBalance} BUSD`);
  // console.log("\tlpOne deposit 10000 DAI and 1000BUSD");

  // //lpToken(pair)
  // const pairAddress = await factory.getPair(ctrAdrs.dai, ctrAdrs.busd);
  // const lpToken = new ethers.Contract(pairAddress, pairAbi, provider);
  // //lpToken(pair)
  // let lpOneLPBalance = await lpToken.balanceOf(lpOne.address);
  // console.log("\tlpOne has ", lpOneLPBalance, "LPs");

  // //Add liquidity
  // console.log("lp3 deposit 1000 DAI and 100 BUSD");
  // await dai.connect(lp3).approve(ctrAdrs.router, "1000");
  // await busd.connect(lp3).approve(ctrAdrs.router, "100");
  // await router
  //   .connect(lp3)
  //   .addLiquidity(
  //     ctrAdrs.dai,
  //     ctrAdrs.busd,
  //     1000,
  //     100,
  //     900,
  //     90,
  //     lp3.address,
  //     Math.floor(Date.now() / 1000 + 120)
  //   );
  // let lp3DAIBalance = await dai.balanceOf(lp3.address);
  // let lp3BUSDBalance = await busd.balanceOf(lp3.address);
  // console.log(`  lp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);
  // let lp3LPBalance = await lpToken.balanceOf(lp3.address);
  // console.log("\tlp3 has ", lp3LPBalance, "LPs");

  // //swap
  // console.log("alice trade");
  // let aliceDAIBalance = await dai.balanceOf(alice.address);
  // let aliceBUSDBalance = await busd.balanceOf(alice.address);
  // console.log(`  alice has got ${aliceDAIBalance} DAI and ${aliceBUSDBalance} BUSD`);
  // await dai.connect(alice).approve(ctrAdrs.router, "1000");
  // await router
  //   .connect(alice)
  //   .swapExactTokensForTokens(
  //     1000,
  //     80,
  //     [ctrAdrs.dai, ctrAdrs.busd],
  //     alice.address,
  //     Math.floor(Date.now() / 1000 + 120)
  //   );
  // console.log("\talice swap 1000 DAI for 100 BUSD");
  // aliceDAIBalance = await dai.balanceOf(alice.address);
  // aliceBUSDBalance = await busd.balanceOf(alice.address);
  // console.log(`  alice has got ${aliceDAIBalance} DAI and ${aliceBUSDBalance} BUSD`);

  // //remove liquidity
  // console.log("lp3 withdraw 50% stake");
  // lpToken.connect(lp3).approve(ctrAdrs.router, "158");
  // await router
  //   .connect(lp3)
  //   .removeLiquidity(
  //     ctrAdrs.dai,
  //     ctrAdrs.busd,
  //     158,
  //     450,
  //     45,
  //     lp3.address,
  //     Math.floor(Date.now() / 1000 + 120)
  //   );
  // lp3DAIBalance = await dai.balanceOf(lp3.address);
  // lp3BUSDBalance = await busd.balanceOf(lp3.address);
  // console.log(`  lp3 has got ${lp3DAIBalance} DAI and ${lp3BUSDBalance} BUSD`);
  // lp3LPBalance = await lpToken.balanceOf(lp3.address);
  // console.log("\tlp3 has ", lp3LPBalance, "LPs");

  // //lpTwo add liquidity to TokenB and TokenC pool
  // console.log("lpTwo is gonna deposit 1000 BUSD and 30000 DAYL to BC pool");
  // let lpTwoBUSDBalance = await busd.balanceOf(lpTwo.address);
  // let lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  // console.log(`  lpTwo has got ${lpTwoBUSDBalance} BUSD and ${lpTwoDAYLBalance} DAYL`);
  // await dayl.connect(lpTwo).approve(ctrAdrs.router, "30000");
  // await busd.connect(lpTwo).approve(ctrAdrs.router, "1000");
  // await router
  //   .connect(lpTwo)
  //   .addLiquidity(
  //     ctrAdrs.dayl,
  //     ctrAdrs.busd,
  //     30000,
  //     1000,
  //     30000,
  //     995,
  //     lpTwo.address,
  //     Math.floor(Date.now() / 1000 + 120)
  //   );
  // lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  // lpTwoBUSDBalance = await busd.balanceOf(lpTwo.address);
  // console.log(`  lpTwo has got ${lpTwoDAYLBalance} DAYL and ${lpTwoBUSDBalance} BUSD`);
  // //lpToken1(pair1)
  // const pairAddress1 = await factory.getPair(ctrAdrs.dayl, ctrAdrs.busd);
  // const lpToken1 = new ethers.Contract(pairAddress1, pairAbi, provider);
  // //lpToken1(pair1)
  // let lpTwoLP1Balance = await lpToken1.balanceOf(lpTwo.address);
  // console.log("\tlpTwo has ", lpTwoLP1Balance, "LP1s");

  //add liquidityETH
  console.log("lpTwo deposit 10000 DAYL and 1ETH");
  let lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  let lpTwoWETHBalance = await weth.balanceOf(lpTwo.address);
  console.log(`  lpTwo has got and ${lpTwoDAYLBalance} DAYL`);
  console.log(`  lpTwo has got and ${ethers.formatEther(lpTwoWETHBalance)} WETH`);

  let lpTwoETH = await ethers.provider.getBalance(lpTwo.address);
  console.log(`\tlpTwo has ${ethers.formatEther(lpTwoETH)} ETH` )

  await dayl.connect(lpTwo).approve(ctrAdrs.router, "10000");
  await weth.connect(lpTwo).approve(ctrAdrs.router, ethers.parseEther("1"))
  await router
    .connect(lpTwo)
    .addLiquidityETH(
      ctrAdrs.dayl,
      10000,
      1,
      1,
      lpTwo.address,
      Math.floor(Date.now() / 1000 + 120),
      {value: ethers.parseEther("1")},
    );
  lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  console.log(`  lpTwo has got ${lpTwoDAYLBalance} DAYL`);
  //daylWethPairToken(pair2)
  const daylWethPairAddress= await factory.getPair(ctrAdrs.dayl, ctrAdrs.weth);
  const daylWethPairToken = new ethers.Contract(daylWethPairAddress, pairAbi, provider);
  //daylWethPairToken(pair2)
  let lpTwodaylWethBalance = await daylWethPairToken.balanceOf(lpTwo.address);
  let pairWethBalance = await weth.balanceOf(daylWethPairAddress);
  lpTwoWETHBalance = await weth.balanceOf(lpTwo.address);
  console.log("\tlpTwo has ", lpTwodaylWethBalance, "daylWethLiquidity");
  console.log("\tpair has ",ethers.formatEther(pairWethBalance), "WETH");
  console.log(`\tlpTwo has got ${ethers.formatEther(lpTwoWETHBalance)} WETH`);
  
  //lpTwo ETH
  lpTwoETH = await ethers.provider.getBalance(lpTwo.address);
  console.log(`\tlpTwo has ${ethers.formatEther(lpTwoETH)} ETH` )
  //WETH Contract ETH
  let wethContractETH = await ethers.provider.getBalance(ctrAdrs.weth);
  console.log(`\tWETH has ${ethers.formatEther(wethContractETH)} ETH` );
  //router ETH
  let routerETH = await ethers.provider.getBalance(ctrAdrs.router);
  console.log(`\trouter has ${ethers.formatEther(routerETH)} ETH`)


  //remove liquidity
  console.log("lpTwo remove 1000000 liquidity");
  lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  lpTwoWETHBalance = await weth.balanceOf(lpTwo.address);
  console.log(`  lpTwo has got and ${lpTwoDAYLBalance} DAYL`);
  console.log(`  lpTwo has got and ${ethers.formatEther(lpTwoWETHBalance)} WETH`);

  await daylWethPairToken.connect(lpTwo).approve(ctrAdrs.router, "10000000");
  await router
    .connect(lpTwo)
    .removeLiquidityETH(
      ctrAdrs.dayl,
      10000000,
      0,
      0,
      lpTwo.address,
      Math.floor(Date.now() / 1000 + 120),
    );
  lpTwoDAYLBalance = await dayl.balanceOf(lpTwo.address);
  console.log(`\tlpTwo has got ${lpTwoDAYLBalance} DAYL`);
  lpTwoWETHBalance = await weth.balanceOf(lpTwo.address);
  console.log(`\tlpTwo has got ${ethers.formatEther(lpTwoWETHBalance)} WETH`);
  lpTwodaylWethBalance = await daylWethPairToken.balanceOf(lpTwo.address);
  console.log("\tlpTwo has ", lpTwodaylWethBalance, "daylWethLiquidity");
  pairWethBalance = await weth.balanceOf(daylWethPairAddress);
  console.log("\tpair has ",ethers.formatEther(pairWethBalance), "WETH");

}

main();
