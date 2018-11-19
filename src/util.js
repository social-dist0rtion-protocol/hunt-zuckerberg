import Web3 from "web3";

function resolveWeb3(resolve) {
  let web3;

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      window.ethereum.enable().then(resolve(web3));
    } catch (err) {
      console.log(err);
    }
  } else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
    resolve(web3);
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
}

function getWeb3(localProvider) {
  if (localProvider === undefined) {
    localProvider = "http://localhost:9545";
  }

  return new Promise(resolve => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => {
      resolveWeb3(resolve, localProvider);
    });
    // If document has loaded already, try to get Web3 immediately.
    if (document.readyState === "complete") {
      resolveWeb3(resolve, localProvider);
    }
  });
}

export { getWeb3 };
