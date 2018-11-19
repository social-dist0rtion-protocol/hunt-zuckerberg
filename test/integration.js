require('dotenv').config();
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
  await wallet.send(huntZuckerberg.methods.resetPlayer(wallet.address));
  await wallet.send(huntZuckerberg.methods.resetCodes());
  return huntZuckerberg;
}

async function testRedeemRightCode() {
  const huntZuckerberg = await setup();
  try {
    const result = await wallet.call(huntZuckerberg.methods.redeem('1234'));
  } catch (err) {
    assert(false, 'Code rejected although correct');
    return;
  }

  assert(true);
}

async function testRedeemWrongCode() {
  const huntZuckerberg = await setup();
  try {
    const result = await wallet.call(
      huntZuckerberg.methods.redeem('wrong code'),
    );
  } catch (err) {
    assert(true);
    return;
  }

  assert(false, 'Code accepted although wrong');
}

async function testPlayerHasCount() {
  const huntZuckerberg = await setup();
  await wallet.send(huntZuckerberg.methods.redeem('1234'));
  const result = await wallet.call(
    huntZuckerberg.methods.playerToCodeCount(wallet.address),
  );

  assert.equal('1', result);
}

async function testCodeBelongsToPlayer() {
  const huntZuckerberg = await setup();
  const testCode = '1234';
  await wallet.send(huntZuckerberg.methods.redeem(testCode));
  const result = await wallet.call(
    huntZuckerberg.methods.hashedCodeToPlayer(web3.utils.keccak256(testCode)),
  );

  assert.equal(wallet.address, result);
}

async function run() {
  await testRedeemRightCode();
  await testRedeemWrongCode();
  await testPlayerHasCount();
  await testCodeBelongsToPlayer();
}

logSetup();
run();
