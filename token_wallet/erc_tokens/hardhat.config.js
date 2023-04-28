require("@nomicfoundation/hardhat-toolbox");

// Get Infura Key or Alchemy key (both are blockchain node providers)
const INFURA_API_KEY = ""

// Get private key of the metamask wallet address. Ensure
// this wallet address has some sepolia test ether. You can get
// sepolia test ether from http://infura.io/faucet or https://sepoliafaucet.com/

const SEPOLIA_PRIVATE_KEY = ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
  hardhat: {
    chainId: 1337
  },
   sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
}
};
