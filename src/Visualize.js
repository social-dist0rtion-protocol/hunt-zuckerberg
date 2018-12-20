import Web3Utils from "web3-utils";
import React, { Component } from "react";
import { getWeb3Anon, getContract } from "./util";
const IMAGE_CONFIG = require("./resources/image_config");

class Visualize extends Component {
  constructor(props) {
    super(props);
    this.state = { activatedCodes: [] };
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const contract = await getContract(web3, "HuntZuckerberg");
    const activatedCodes = await contract.methods
      .getActivatedHashedCodes()
      .call();
    this.setState({
      activatedCodes: activatedCodes
    });
  }

  render() {
    const { activatedCodes } = this.state;
    return (
      <div className="App">
        <div
          style={{
            position: "relative",
            margin: "auto",
            width: "2480px",
            height: "1656px"
          }}
        >
          {activatedCodes.map(function(code) {
            const hexCode = Web3Utils.toHex(code);
            console.log(hexCode);
            const { image, left, top, width, height } = IMAGE_CONFIG[hexCode];
            return (
              <div
                key={hexCode}
                style={{
                  position: "absolute",
                  left: left,
                  top: top,
                  width: width,
                  height: height
                }}
              >
                <img
                  src={"./images/puzzle/" + image}
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
