const QRCode = require("qrcode");

const tokens = require(process.argv[2]);
const { homepage } = require("../package.json");
const SIZE = 180;

const titles = [
  "All your Mark Zuckerbergs are belong to us.",
  "A wild Mark Zuckerberg appears",
  "Refreshing memories of Mark Zuckerberg",
  "Welcome to 2055. This is a piece of Mark Zuckerberg",
  "Cut my Mark into pieces, this is my last resort",
  "640k of Mark should be enough for anybody",
  "206 Partial Mark Found"
];

function renderQRCode(qrcode) {
  const title = titles[Math.floor(Math.random() * titles.length)];
  return `
  <div>
  ${title}
  <img src="${qrcode}"/>
  </div>
  `;
}

async function renderQRCodes(tokens) {
  const keys = Object.keys(tokens);
  const qrcodes = [];
  for (var i = 0; i < keys.length; i++) {
    qrcodes.push(
      await QRCode.toDataURL(`https://huntzuckerberg.xyz/#/redeem/${keys[i]}`)
    );
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
  <style>
  div {
  font-family: monospace;
    font-size: ${SIZE / 10}px;
    width: ${SIZE}px;
    border: 2px solid black;
    margin: 10px;
    text-align: center;
    display: inline-block;
    padding: 10px
  }
  img {
    width: ${SIZE}px;
    height: ${SIZE}px;
    image-rendering: pixelated;
    display: block;
    margin: 0 auto;
  }
  </style>
  </head>
  <body>
  ${qrcodes.map(renderQRCode).join("\n")}
  </body>
</html>
`;
}

renderQRCodes(require("../src/resources/tokens")).then(console.log);
