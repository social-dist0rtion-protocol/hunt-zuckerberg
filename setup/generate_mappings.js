const web3 = require('web3');
const uuidv4 = require('uuid/v4');
const slices = require('./slices.js');
const fs = require('fs');

// It generates 2 files
// - tokens.txt mapping a token to its hash
// - image_config.js mapping hashed tokens to image slices (to be used directly by the visualizer)
async function generateConfig(images) {
  var imageConfig = {};
  var tokenMap = '';
  images.forEach(function(image) {
    const token = uuidv4();
    const hashedToken = web3.utils.keccak256(token);
    tokenMap += token + ' ' + hashedToken + '\n';
    imageConfig[hashedToken] = image;
  });
  fs.writeFile('tokens.txt', tokenMap, function(err) {});
  var dumpImageConfig = JSON.stringify(imageConfig);
  fs.writeFile(
    'image_config.js',
    'export const IMAGE_CONFIG = ' + dumpImageConfig,
    function(err) {},
  );
}

generateConfig(slices['slices']);
