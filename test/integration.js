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
  var huntZuckerberg;

  beforeEach(async function() {
    huntZuckerberg = await setup();
  });

  describe('reset', async function() {
    it('resets the whole state', async function() {
      await wallet.call(huntZuckerberg.methods.redeem('1234'));
      await wallet.send(huntZuckerberg.methods.reset());

      expect(
        await wallet.call(
          huntZuckerberg.methods.playerToCodeCount(wallet.address),
        ),
      ).to.equal('0');
      expect(
        await wallet.call(
          huntZuckerberg.methods.hashedCodeToPlayer(
            web3.utils.keccak256('1234'),
          ),
        ),
      ).to.equal('0x0000000000000000000000000000000000000001');
      await expect(wallet.call(huntZuckerberg.methods.activatedHashedCodes(0)))
        .to.be.rejected;
      await expect(wallet.call(huntZuckerberg.methods.players(0))).to.be
        .rejected;
    });
  });

  describe('getActivatedHashedCodes', async function() {
    it('returns activatedHashedCodes list', async function() {
      const expectedActivatedHashedCode =
        '25545973485761316460330510359994482907632646233309271214536774824048483265015';
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(
        huntZuckerberg.methods.getActivatedHashedCodes(),
      );

      expect(result[0]).to.equal(expectedActivatedHashedCode);
    });
  });

  describe('redeem', async function() {
    it('redeemds right code without exception', async function() {
      expect(async function() {
        await wallet.call(huntZuckerberg.methods.redeem('1234'));
      }).to.not.throw();
    });

    it('rejects wrong code', async function() {
      await expect(wallet.call(huntZuckerberg.methods.redeem('wrong'))).to.be
        .rejected;
    });

    it('updates players count', async function() {
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(
        huntZuckerberg.methods.playerToCodeCount(wallet.address),
      );
      expect(result).to.equal('1');
    });

    it('assigns code to player', async function() {
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
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(huntZuckerberg.methods.players(0));

      expect(result).to.equal(wallet.address);
    });

    it('updates activatedHashedCodes list', async function() {
      const expectedActivatedHashedCode =
        '25545973485761316460330510359994482907632646233309271214536774824048483265015';
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      const result = await wallet.call(
        huntZuckerberg.methods.activatedHashedCodes(0),
      );

      expect(result).to.equal(expectedActivatedHashedCode);
    });

    it('does not add duplicate players', async function() {
      await wallet.send(huntZuckerberg.methods.redeem('1234'));
      await wallet.send(huntZuckerberg.methods.redeem('2345'));

      await expect(wallet.call(huntZuckerberg.methods.players(1))).to.be
        .rejected;
    });
  });
});

//logSetup();
