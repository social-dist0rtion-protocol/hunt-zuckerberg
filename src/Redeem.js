import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Web3Utils from "web3-utils";
import { getWeb3, getWeb3Anon, getContract, isWallet } from "./util";

const IMAGE_CONFIG = require("./resources/image_config");

class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async handleRedeem() {
    this.setState({ loading: true });
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    const contract = await getContract(web3, "HuntZuckerberg");
    try {
      await contract.methods
        .redeem(this.props.match.params.token)
        .send({ from: account });
      this.setState({ wasRedeemed: true, loading: false});
    } catch (err) {
      alert(err);
    }
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const contract = await getContract(web3, "HuntZuckerberg");
    window.contract = contract;
    const tokenToPlayer = await contract.methods
      .hashedCodeToPlayer(Web3Utils.keccak256(this.props.match.params.token))
      .call();
    this.setState({
      isTokenRedeemed:
        tokenToPlayer !== "0x0000000000000000000000000000000000000001"
    });
  }

  componentDidUpdate() {
    if (this.state.wasRedeemed === true) {
      window.confetti = "100%";
    }
  }

  render() {
    const token = this.props.match.params.token;
    const hexToken = Web3Utils.keccak256(token);
    if (!IMAGE_CONFIG[hexToken]) {
      return <h1>Invalid Token</h1>;
    }
    const { isTokenRedeemed } = this.state;
    const { image } = IMAGE_CONFIG[hexToken];

    return (
      <div className="Redeem">
        <h1>You've found a ZUCKERBIT!</h1>
        <p>
          Mark Zuckerberg has been decentralized and spread around the 35c3.
          Redeem this token and help us reassemble the ZUCKERBITS into a
          ZUCKERBERG.
        </p>
        <div className="token">
          <h2>{token}</h2>
          <img src={`./images/puzzle/${image}`} alt="" />
          <button
            disabled={isTokenRedeemed}
            onClick={this.handleRedeem.bind(this)}
          >
            Redeem
          </button>
        </div>
        {this.state.wasRedeemed && (
          <div className="success">
            <p>You've successfully have redeemed a piece of Mark! Congraz!</p>
          </div>
        )}

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

export default withRouter(Redeem);
