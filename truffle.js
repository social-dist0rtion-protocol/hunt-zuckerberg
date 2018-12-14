require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const g = (name, fallback) => process.env[name] || fallback;

const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require("ethereumjs-wallet");
const mnemonic = g("MNEMONIC", "test");
const myPrivateKey = g("PRIVATE_KEY", "");
const endpoint = g("RPC_ENDPOINT", "http://localhost:7545");

if (myPrivateKey) {
  // read the private key `PRIVATE_KEY` from our ENV variables
  let privateKey = new Buffer(myPrivateKey, "hex");
  // create a wallet using the private key
  let wallet = Wallet.fromPrivateKey(privateKey);
  // and initialize a wallet provider with the selected endpoint
  provider = new WalletProvider(wallet, endpoint);
} else if (mnemonic) {
  // and initialize a wallet provider with the selected endpoint
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
      gasPrice: web3.utils.toWei("20", "gwei"),
      network_id: "*"
    }
  }
};
