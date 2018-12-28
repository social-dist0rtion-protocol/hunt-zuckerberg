import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Web3Utils from "web3-utils";
import { getWeb3, getWeb3Anon, getContract, isWallet } from "./util";

const IMAGE_CONFIG = require("./resources/image_config");
const NEW_TOKEN = "0x0000000000000000000000000000000000000001";

class Redeem extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  async handleRedeem() {
    this.setState({ loading: true });
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    const contract = await getContract(web3, "HuntZuckerberg");
    //try {
    // await
    contract.methods
      .redeem(this.props.match.params.token)
      .send({ from: account });
    //   this.setState({ wasRedeemed: true, loading: false });
    // } catch (err) {
    //   alert(err);
    // }
  }

  async updateCode(web3, account, contract) {
    let owner = this.state.owner;
    const tokenToPlayer = await contract.methods
      .hashedCodeToPlayer(Web3Utils.keccak256(this.props.match.params.token))
      .call();
    if (tokenToPlayer === NEW_TOKEN) {
      owner = null;
    } else if (tokenToPlayer === account) {
      owner = "me";
    } else {
      owner = "other";
    }
    this.setState({
      owner: owner
    });

    if (owner === "me" || owner === "other") {
      this.setState({
        loading: false
      });
    }

    setTimeout(
      async () => await this.updateCode(web3, account, contract),
      1000
    );
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const account = (await web3.eth.getAccounts())[0];
    const contract = await getContract(web3, "HuntZuckerberg");
    this.updateCode(web3, account, contract);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.owner !== "me" && this.state.owner === "me") {
      window.confetti = "100%";
    }
  }

  render() {
    const token = this.props.match.params.token;
    const hexToken = Web3Utils.keccak256(token);
    if (!IMAGE_CONFIG[hexToken]) {
      return <h1>Invalid Token</h1>;
    }
    const { owner, loading } = this.state;
    const { image } = IMAGE_CONFIG[hexToken];
    let title;
    if (owner === "me") {
      title = "You own this ZUCKERBIT!";
    } else if (owner === "other") {
      title = "Someone already got this ZUCKERBIT.";
    } else {
      title = "Congrats! You've found a ZUCKERBIT!";
    }

    return (
      <div className="Redeem narrow">
        <h1>{title}</h1>
        <p>
          Mark Zuckerberg has been decentralized and spread around the 35c3.
          Redeem this token and help us reassemble the ZUCKERBITS into a
          ZUCKERBERG.
        </p>
        <div className="token">
          <h2>{token}</h2>
          <img src={`./images/puzzle/${image}`} alt="" />
          {isWallet() && !owner && !loading && (
            <button onClick={this.handleRedeem.bind(this)}>Redeem</button>
          )}
          {loading && (
            <div>
              <p>Loading... It can take up to 15 seconds</p>
            </div>
          )}
          {this.state.owner === "me" && (
            <div className="success">
              <p>You've successfully have redeemed a piece of Mark! Congraz!</p>
            </div>
          )}
        </div>

        {!isWallet() && (
          <div className="alert warning">
            <p>
              You are not using an Ethereum compatible browser. In order to
              redeem the token, you need to install{" "}
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer">
                MetaMask
              </a>{" "}
              on your browser.
            </p>
          </div>
        )}
        <h2>What is this?</h2>
        <p>This game works on the Ethereum Rinkeby blockchain.</p>
        <p>
          Read how it works in the <Link to="/">about page</Link>, and make
          sure to visit us at the
          <a href="https://35c3.c3nav.de/l/social-dist0rtion-protocol/">
            assembly table.
          </a>
        </p>
      </div>
    );
  }
}

export default withRouter(Redeem);
