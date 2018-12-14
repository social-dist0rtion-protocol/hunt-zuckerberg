# hunt-zuckerberg
Decentralized Treasure Hunt

## Run DApp
You need a network to deploy the contract for the game. You can use [Ganache][ganache], [Ganache CLI][ganache:cli], a (test) network through [infura][infura], or your own node.

- deploy the contract with `truffle migrate`. If it fails you might try `truffle migrate --reset`.
- `npm start`
- open http://localhost:3000 on your wallet or on your browser (make sure you have metamask installed)

## Run tests
`./node_modules/.bin/mocha --reporter spec`


[ganache]: https://truffleframework.com/ganache
[ganache:cli]: https://github.com/trufflesuite/ganache-cli
[infura]: https://infura.io/
