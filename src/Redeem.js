import Web3Utils from "web3-utils";
import React, { Component } from "react";
import { getWeb3, getWeb3Anon, getContract, isWallet } from "./util";
import { Link } from "react-router-dom";

class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async handleRedeem() {
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    const contract = await getContract(web3, "HuntZuckerberg");
    contract.methods
      .redeem(this.props.match.params.code)
      .send({ from: account });
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const contract = await getContract(web3, "HuntZuckerberg");
    const codeOwner = await contract.methods
      .hashedCodeToPlayer(Web3Utils.keccak256(this.props.match.params.code))
      .call();
    console.log(codeOwner);
    this.setState({
      isCodeAlreadyRedeemed:
        codeOwner !== "0x0000000000000000000000000000000000000001"
    });
  }

  render() {
    const token = this.props.match.params.token;
    const { isCodeAlreadyRedeemed } = this.state;

    return (
      <div className="Redeem">
        <h1>You've found a piece of Mark Zuckerberg!</h1>

        <p>
          Mark Zuckerberg has been decentralized and spread around the 35c3.
          Redeem this code and help us rebuilding Mark.
        </p>
        <div className="token">
          <h2>{token}</h2>
          <button
            disabled={isCodeAlreadyRedeemed}
            onClick={this.handleRedeem.bind(this)}
          >
            Redeem
          </button>
        </div>

        {!isWallet() && (
          <div className="alert warning">
            <p>
              You are not using an Ethereum compatible browser. In order to
              redeem the token, you need to install{" "}
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask
              </a>{" "}
              on your browser.
            </p>
          </div>
        )}
        <h2>What is this?</h2>
        <p>This game works on the Ethereum Rinkeby blockchain.</p>
        <p>
          Read how it works in the <Link to="/about">about page</Link>, and make
          sure to visit us at the assembly table.
        </p>
      </div>
    );
  }
}

export default Redeem;
