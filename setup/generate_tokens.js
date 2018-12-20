const web3 = require("web3");
const uuidv4 = require("uuid/v4");
const fs = require("fs");

function generateTokens(count) {
  var tokenMap = {};
  while (count-- > 0) {
    const token = uuidv4();
    const hashedToken = web3.utils.keccak256(token);
    tokenMap[token] = hashedToken;
  }

  return tokenMap;
}

const slicesFile = process.argv[2];
const outFile = process.argv[3];
const slices = JSON.parse(fs.readFileSync(slicesFile, "utf8"));

const tokenMap = generateTokens(slices.length);
fs.writeFileSync(outFile, JSON.stringify(tokenMap), function(err) {});
