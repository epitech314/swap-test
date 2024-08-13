# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

hardhat config:

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.24",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    hardhat: {
      initialDate: "2024-07-30T00:56:00.000+00:00",
      saveDeployments: false,
      allowUnlimitedContractSize: true,
      tags: ["ido", "presale", "test"],
    },
  }
};

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node ( = npm run hhnode)
hardhat run deploy/deploy.js --network localhost (= npm run deployln)
hardhat run scripts/test.js --network localhost (= npm run removetest)
```