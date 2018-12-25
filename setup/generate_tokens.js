require("dotenv").config();
const web3 = require("web3");
const seedrandom = require("seedrandom");
const fs = require("fs");

function generateTokens(seed, count) {
  var tokenMap = {};
  while (count-- > 0) {
    const seedRnd = seedrandom(seed + count);
    const token = Buffer.from(seedRnd().toString()).toString("base64");
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
