const web3 = require('web3');
const fs = require('fs');
var HuntZuckerberg = artifacts.require('./HuntZuckerberg.sol');

module.exports = function(deployer) {
  const tokenMap = JSON.parse(fs.readFileSync('resources/tokens.json', 'utf8'));
  const intHashedTokens = Object.values(tokenMap).map(hashedToken =>
    web3.utils.hexToNumberString(hashedToken),
  );
  deployer.deploy(HuntZuckerberg, intHashedTokens);
};
