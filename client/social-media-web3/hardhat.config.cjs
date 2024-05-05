require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.VITE_SEED_PHRASE,
      },
      chainId: 1337,
      mining: {
        auto: true,
        interval: 2000
      }
    },
  },
};
