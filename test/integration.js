require('dotenv').config();
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
chai.use(chaiAsPromised);

const assert = require('assert');
const SimpleWallet = require('./utils');
const web3 = require('web3');
const c = require('colors');

const g = (name, fallback) => process.env[name] || fallback;

const wallet = new SimpleWallet(
  g('PRIVATE_KEY'),
  g('PUBLIC_KEY'),
  g('RPC_ENDPOINT'),
);

async function logSetup() {
  const huntZuckerberg = await wallet.loadContract('HuntZuckerberg');
  console.log('Setup values');
  console.log('  User wallet address', c.green(wallet.address));
  console.log(
    '  HuntZuckerberg smart contract address',
    c.green(huntZuckerberg.options.address),
  );
}

async function setup() {
  const huntZuckerberg = await wallet.loadContract('HuntZuckerberg');
  await wallet.send(huntZuckerberg.methods.reset());
  return huntZuckerberg;
}

describe('Hunt Zuckerberg', function() {
  describe('redeem', async function() {
    it('redeemds right code without exception', async function() {
      const huntZuckerberg = await setup();
      expect(async function() {
        await wallet.call(huntZuckerberg.methods.redeem('1234'));
      }).to.not.throw();
    });

    it('rejects wrong code', async function() {
      const huntZuckerberg = await setup();
      await expect(wallet.call(huntZuckerberg.methods.redeem('wrong'))).to.be
        .rejected;
    });

    it('updates players count', async function() {
      const huntZuckerberg = await setup();
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(
        huntZuckerberg.methods.playerToCodeCount(wallet.address),
      );
      expect(result).to.equal('1');
    });

    it('assigns code to player', async function() {
      const huntZuckerberg = await setup();
      const testCode = '1234';
      await wallet.send(huntZuckerberg.methods.redeem(testCode));

      const result = await wallet.call(
        huntZuckerberg.methods.hashedCodeToPlayer(
          web3.utils.keccak256(testCode),
        ),
      );

      expect(result).to.be.equal(wallet.address);
    });

    it('updates players list', async function() {
      const huntZuckerberg = await setup();
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(huntZuckerberg.methods.players(0));

      expect(result).to.equal(wallet.address);
    });

    it('does not add duplicate players', async function() {
      const huntZuckerberg = await setup();
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      await wallet.send(huntZuckerberg.methods.redeem('2345'));
      await expect(wallet.call(huntZuckerberg.methods.players(1))).to.be
        .rejected;
    });
  });
});

//logSetup();
