require("dotenv").config();
const web3 = require("web3");
const seedrandom = require("seedrandom");
const fs = require("fs");

function generateToken(prng, bits, chars) {
  if (chars === undefined) {
    chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }
  let token = "";
  for (let i = 0; i < Math.ceil(bits / Math.log2(chars.length)); i++) {
    token += chars[Math.floor(prng() * chars.length)];
  }
  return token;
}

function generateTokens(seed, count) {
  var tokenMap = {};
  const rnd = seedrandom(seed);
  while (count-- > 0) {
    var source = "";
    var parts = [];
    // Each call of rnd generates 32 bits of randomness in a float.
    for (var i = 0; i < 4; i++) {
      parts.push(web3.utils.keccak256(rnd().toString()).substr(2, 8));
    }
    const token = parts.join("-");
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
