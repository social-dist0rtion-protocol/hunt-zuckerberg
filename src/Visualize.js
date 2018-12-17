import Web3Utils from 'web3-utils';
import React, {Component} from 'react';
import {getWeb3, getWeb3Anon, getContract} from './util';
import {IMAGE_CONFIG} from './image_config.js';

class Visualize extends Component {
  constructor(props) {
    super(props);
  }

  getActivatedTokens() {
    return [
      '0x2ecbd0fcd2f35ec56fb476b63e3db5c82aceccad006fdddb0cef60f35565ae45',
      '0xd48a856e44917eeb6783382eb1c45e04563ea265bcbfaa2d0a70b1fd5004cc9e',
    ];
  }

  async componentDidMount() {}

  render() {
    const nums = [1, 2, 3];
    return (
      <div className="App">
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            width: '2480px',
            height: '1656px',
          }}>
          {this.getActivatedTokens().map(function(item) {
            const {image, left, top, width, height} = IMAGE_CONFIG[item];
            return (
              <div
                key={item}
                style={{
                  position: 'absolute',
                  left: left,
                  top: top,
                  width: width,
                  height: height,
                }}>
                <img
                  src={require('./images/waterberg/' + image)}
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
