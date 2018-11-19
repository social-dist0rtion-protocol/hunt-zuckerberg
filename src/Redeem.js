import React, { Component } from "react";
import { getWeb3 } from "./util";

class Redeem extends Component {
  async componentDidMount() {
    const web3 = await getWeb3();
    const account = (await web3.eth.getAccounts())[0];
    console.log(account);
  }

  render() {
    const code = this.props.match.params.code;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Redeem</h1>
          <h2>{code}</h2>
          <button>Redeem</button>
        </header>
      </div>
    );
  }
}

export default Redeem;
