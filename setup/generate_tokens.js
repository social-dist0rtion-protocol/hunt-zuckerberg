require("dotenv").config();
const web3 = require("web3");
const seedrandom = require("seedrandom");
const fs = require("fs");

function generateTokens(seed, count) {
  var tokenMap = {};
  const rnd = seedrandom(seed);
  while (count-- > 0) {
    var source = "";
    var parts = [];
    // each call of rnd generates 32 bits of randomness in a float,
    // call it 4 times and you get 128 bits
    for (var i = 0; i < 4; i++) {
      source += rnd().toString();
    }
    // get the hash of the source string, remove "0x"
    const image = web3.utils.keccak256(source).substr(2);

    // split the string in four 8-char parts
    for (var i = 0; i < 4; i++) {
      parts.push(image.substr(i * 8, 8));
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
