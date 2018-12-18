var HuntZuckerberg = artifacts.require('./HuntZuckerberg.sol');

module.exports = function(deployer) {
  deployer.deploy(HuntZuckerberg, ['1234', '2345']);
};
