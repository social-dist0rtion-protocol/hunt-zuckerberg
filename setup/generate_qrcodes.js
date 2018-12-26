const QRCode = require("qrcode");

const tokens = require(process.argv[2]);
const { homepage } = require("../package.json");

function renderQRCode(qrcode) {
  return `
  <div>
  hunt zuckerberg
  <img src="${qrcode}"/>
  </div>
  `;
}

async function renderQRCodes(tokens) {
  const keys = Object.keys(tokens);
  const qrcodes = [];
  for (var i = 0; i < keys.length; i++) {
    qrcodes.push(await QRCode.toDataURL(`${homepage}/redeem/${keys[i]}`));
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
  <style>
  div { width: 200px; border: 2px solid black; margin: 10px; text-align: center;
  display: inline-block; }
  </style>
  </head>
  <body>
  ${qrcodes.map(renderQRCode).join("\n")}
  </body>
</html>
`;
}

renderQRCodes(require("../src/resources/tokens")).then(console.log);
