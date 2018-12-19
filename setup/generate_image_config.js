const fs = require('fs');

function generateConfig(tokenMap, slices) {
  var imageConfig = {};
  Object.values(tokenMap).forEach(function(hashedToken, i) {
    imageConfig[hashedToken] = slices[i];
  });

  return imageConfig;
}

const slicesFile = process.argv[2];
const tokensFile = process.argv[3];
const outFile = process.argv[4];

const slices = JSON.parse(fs.readFileSync(slicesFile, 'utf8'));
const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));

const imageConfig = generateConfig(tokens, slices);
fs.writeFile(
  outFile,
  'export const IMAGE_CONFIG = ' + JSON.stringify(imageConfig),
  function(err) {},
);
