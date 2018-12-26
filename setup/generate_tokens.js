require("dotenv").config();
const web3 = require("web3");
const seedrandom = require("seedrandom");
const fs = require("fs");

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateToken(prng, bits) {
  let token = "";
  for (let i = 0; i < Math.ceil(bits / Math.log2(CHARS.length)); i++) {
    token += CHARS[Math.floor(prng() * CHARS.length)];
  }
  return token;
}

function generateTokens(seed, count) {
  var tokenMap = {};
  const rnd = seedrandom(seed);
  while (count-- > 0) {
    const token = generateToken(rnd, 128);
    const hashedToken = web3.utils.keccak256(token);
    tokenMap[token] = hashedToken;
  }

  return tokenMap;
}

const slicesFile = process.argv[2];
const outFile = process.argv[3];
const seedString = process.argv[4];
const slices = JSON.parse(fs.readFileSync(slicesFile, "utf8"));
const tokenMap = generateTokens(seedString, slices.length);
fs.writeFileSync(outFile, JSON.stringify(tokenMap, null, 2), function(err) {});
