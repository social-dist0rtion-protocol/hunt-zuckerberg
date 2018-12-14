import Web3Utils from "web3-utils";
import React, { Component } from "react";
import { getWeb3, getWeb3Anon, getContract } from "./util";

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
    const web3 = await getWeb3();
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
    const code = this.props.match.params.code;
    const { isCodeAlreadyRedeemed } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Redeem</h1>
          <h2>{code}</h2>
          <button
            disabled={isCodeAlreadyRedeemed}
            onClick={this.handleRedeem.bind(this)}
          >
            Redeem
          </button>
        </header>
      </div>
    );
  }
}

export default Redeem;
