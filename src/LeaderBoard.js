import React, { Component } from "react";
import { getWeb3Anon, getContract, toHexAndPad } from "./util";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { owners: {} };
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const [account = "none"] = await web3.eth.getAccounts();
    const contract = await getContract(web3, "HuntZuckerberg");
    const activatedCodes = (
      (await contract.methods.getActivatedHashedCodes().call()) || []
    ).map(code => toHexAndPad(code));
    this.setState({
      account: account
    });
    activatedCodes.map(async code => {
      const tokenToPlayer = await contract.methods
        .hashedCodeToPlayer(code)
        .call();
      const owners = this.state.owners;
      owners[tokenToPlayer] = (owners[tokenToPlayer] || 0) + 1;
      this.setState({ owners: owners });
    });
  }

  render() {
    let { account, owners } = this.state;
    let items = Object.keys(owners).map(k => [k, owners[k]]);
    items.sort((a, b) => a[1] - b[1]);
    return (
      <div className="LeaderBoard narrow">
        <h1>Leader Board</h1>
        <p>List of all players and tokens redeemed</p>
        <ol>
          {items.map(([owner, tokens]) => (
            <li key={owner}>
              <span className="jazzicon">
                <span className="tokens">{tokens}</span>
                <Jazzicon diameter={100} seed={jsNumberForAddress(owner)} />
              </span>
              <span className="owner">{owner}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default LeaderBoard;
