# hunt-zuckerberg
Decentralized Treasure Hunt

## Setup
Before starting, you need a Photoshop generated HTML file, containing all the information of the puzzle image slices. Then:
```
mv <your photoshop file> setup/slices.html
cd setup
make install
```
After this, you can run the truffle migration script and the app.

## Run DApp
You need a network to deploy the contract for the game. You can use [Ganache][ganache], [Ganache CLI][ganache:cli], a (test) network through [infura][infura], or your own node.

- deploy the contract with `truffle migrate`. If it fails you might try `truffle migrate --reset`.
- `npm start`
- open http://localhost:3000 on your wallet or on your browser (make sure you have metamask installed)

## Run tests
`./node_modules/.bin/mocha --reporter spec`

## Experimental
Try `npm run dev` to compile the game, compile the smart contracts, run ganache, build the app.

[ganache]: https://truffleframework.com/ganache
[ganache:cli]: https://github.com/trufflesuite/ganache-cli
[infura]: https://infura.io/
