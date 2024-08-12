require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
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
