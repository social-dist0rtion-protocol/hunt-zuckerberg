import React, { Component } from "react";
import { getWeb3Anon, getContract, toHexAndPad } from "./util";
const IMAGE_CONFIG = require("./resources/image_config");

class Visualize extends Component {
  constructor(props) {
    super(props);
    this.state = { activatedCodes: [], owners: {} };
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const [account = "none"] = await web3.eth.getAccounts();
    const contract = await getContract(web3, "HuntZuckerberg");
    const activatedCodes = (
      (await contract.methods.getActivatedHashedCodes().call()) || []
    ).map(code => toHexAndPad(code));
    this.setState({
      activatedCodes: activatedCodes,
      account: account
    });
    activatedCodes.map(async code => {
      const tokenToPlayer = await contract.methods
        .hashedCodeToPlayer(code)
        .call();
      const owners = this.state.owners;
      owners[code] = tokenToPlayer;
      this.setState({ owners: owners });
    });
  }

  render() {
    let { activatedCodes, account, owners } = this.state;
    if (!activatedCodes) {
      activatedCodes = [];
    }
    return (
      <div className="Visualize">
        <div
          style={{
            position: "relative",
            margin: "auto",
            width: "2480px",
            height: "1656px"
          }}
        >
          {activatedCodes.map(function(code) {
            const { image, left, top, width, height } = IMAGE_CONFIG[code];

            return (
              <div
                key={code}
                className={owners[code] === account ? "mine" : ""}
                style={{
                  position: "absolute",
                  left: left,
                  top: top,
                  width: width,
                  height: height
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/puzzle/" + image}
                  width={width}
                  height={height}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Visualize;
