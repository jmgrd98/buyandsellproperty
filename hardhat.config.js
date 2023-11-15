/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    defaultNetwork: 'goerli',
    networks: {
      hardhat: {},
      sepolia: {
        url: 'https://rpc.sepolia.dev',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      },
      goerli: {
        url: 'https://rpc.ankr.com/eth_goerli',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
