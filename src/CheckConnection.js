import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getWeb3Anon, isConnected } from "./util";

class CheckConnection extends Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: true };
  }
  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const connected = await isConnected(web3);
    this.setState({ isConnected: connected });
  }

  render() {
    const { isConnected } = this.state;
    if (isConnected) {
      return null;
    }
    return (
      <div className="CheckConnection alert warning">
        Please use the Rinkeby Network.
      </div>
    );
  }
}

export default CheckConnection;
