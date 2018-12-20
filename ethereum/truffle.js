require("dotenv").config({ path: "../.env" });

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require("ethereumjs-wallet");

const mnemonic = process.env.MNEMONIC || "test";
const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.RPC_ENDPOINT || "http://localhost:8545";

let provider;

if (privateKey) {
  let wallet = Wallet.fromPrivateKey(new Buffer(myPrivateKey, "hex"));
  provider = new WalletProvider(wallet, endpoint);
} else if (mnemonic) {
  provider = new HDWalletProvider(mnemonic, endpoint);
}

module.exports = {
  networks: {
    development: {
      provider: provider,
      // You can get the current gasLimit by running
      // truffle deploy
      // truffle(ropsten)> web3.eth.getBlock('pending', (error, result) =>
      //   console.log(result.gasLimit))
      gas: 4600000,
      gasPrice: Web3.utils.toWei("20", "gwei"),
      network_id: "*"
    }
  }
};
