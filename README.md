# hunt-zuckerberg
Decentralized Treasure Hunt

## Requirements
penv
`npm install -g penv`

## Setup and deploy
Before starting, you need a Photoshop generated HTML file, containing all the information of the puzzle image slices. Then:
```
(cd ethereum && truffle migrate --reset)
mv <your photoshop file> setup/slices.html
```
### Deploy github
```
cd setup
make deploy
```
### Deploy ipfs
```
cd setup
STAGE=ipfs make deploy
```
This will generate the necessary configuration files, move the contracts in the src dir, build and deploy to a running IPFS node.
For the deployment to the node you need to have your public key authorized. Contact @sirnicolaz for this.
At the end, the website will be deployed to ipfs and published to the node, accessible then via IPNS.
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

