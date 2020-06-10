const HDWalletProvider = require('@truffle/hdwallet-provider')
var mnemonic = ""
module.exports = {
  networks: {
    cldev: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    // ganache: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "5777" // matching any id
    // },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/ws/v3/51968d00a8ca43b989457aab35ffca42");
      },
      network_id: 1
    }
    // ropsten: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: 3,
    //   gas: 4700000
    // },
    // kovan: {
    //   host: "127.0.0.1",
    //   port: 8545,
    //   network_id: 42,
    //   gas: 4700000
    // },
    // live: {
    //   provider: () => {
    //     return new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL)
    //   },
    //   network_id: '*',
    //   // Necessary due to https://github.com/trufflesuite/truffle/issues/1971
    //   // Should be fixed in Truffle 5.0.17
    //   skipDryRun: true,
    // },
 },
  compilers: {
    solc: {
      version: '0.4.24',
    },
  },
}
