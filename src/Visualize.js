import React, {Component} from 'react';
import {getWeb3Anon, getContract} from './util';
import {IMAGE_CONFIG} from './image_config.js';

class Visualize extends Component {
  constructor(props) {
    super(props);
    this.state = {activatedCodes: []};
  }

  async componentDidMount() {
    const web3 = await getWeb3Anon();
    const contract = await getContract(web3, 'HuntZuckerberg');
    const activatedCodes = await contract.methods
      .getActivatedHashcodes()
      .call();
    this.setState({
      activatedCodes: activatedCodes,
    });
  }

  render() {
    const {activatedCodes} = this.state;
    return (
      <div className="App">
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            width: '2480px',
            height: '1656px',
          }}>
          {activatedCodes.map(function(item) {
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
                  src={require('./images/puzzle/' + image)}
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
