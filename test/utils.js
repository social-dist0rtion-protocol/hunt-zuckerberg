const Web3 = require('web3');
const Web3Utils = require('web3-utils');
const Tx = require('ethereumjs-tx');

class SimpleWallet {
  constructor(privateKey, publicKey, provider) {
    if (provider === undefined || typeof provider === 'string') {
      provider = new Web3.providers.HttpProvider(
        provider || 'http://localhost:8545',
      );
    }
    this.web3 = new Web3(provider);
    this.privateKey = privateKey;
    this.address = publicKey;
  }

  async loadContract(name) {
    const metadata = require(`../build/contracts/${name}.json`);
    const networkId = await this.web3.eth.net.getId();
    const contractAbi = metadata.abi;
    const contractAddress = metadata.networks[networkId].address;
    const contract = new this.web3.eth.Contract(contractAbi, contractAddress);
    return contract;
  }

  async send(method) {
    const data = method.encodeABI();
    const count = await this.web3.eth.getTransactionCount(this.address);
    const rawTx = {
      from: this.address,
      to: method._parent.options.address,
      nonce: this.web3.utils.toHex(count),
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('21', 'gwei')),
      gasLimit: this.web3.utils.toHex(
        await method.estimateGas({from: this.address}),
      ),
      data: data,
    };
    var tx = new Tx(rawTx);
    tx.sign(Buffer.from(this.privateKey, 'hex'));
    await this.web3.eth.sendSignedTransaction(
      '0x' + tx.serialize().toString('hex'),
    );
  }

  async call(method) {
    return method.call({from: this.address});
  }
}

module.exports = SimpleWallet;
