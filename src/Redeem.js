import React, { Component } from "react";
import { getWeb3, getContract } from "./util";

class Redeem extends Component {
  async handleRedeem() {
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    const contract = await getContract(web3, "HuntZuckerberg");
    contract.methods
      .redeem(this.props.match.params.code)
      .send({ from: account });
  }

  render() {
    const code = this.props.match.params.code;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Redeem</h1>
          <h2>{code}</h2>
          <button onClick={this.handleRedeem.bind(this)}>Redeem</button>
        </header>
      </div>
    );
  }
}

export default Redeem;
