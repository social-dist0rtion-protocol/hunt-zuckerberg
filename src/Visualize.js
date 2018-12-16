import Web3Utils from 'web3-utils';
import React, {Component} from 'react';
import {getWeb3, getWeb3Anon, getContract} from './util';

class Visualize extends Component {
  constructor(props) {
    super(props);
  }

  async getActivatedTokens() {
    return ['asdasd123', '123123asd'];
  }

  async componentDidMount() {}

  render() {
    return (
      <div className="App">
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            width: '2480px',
            height: '1656px',
          }}>
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '1020px',
              height: '584px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_01.jpg')}
              width="1020"
              height="584"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1020px',
              top: '0px',
              width: '820px',
              height: '244px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_02.jpg')}
              width="820"
              height="244"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1840px',
              top: '0px',
              width: '640px',
              height: '244px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_03.jpg')}
              width="640"
              height="244"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1020px',
              top: '244px',
              width: '120px',
              height: '340px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_04.jpg')}
              width="120"
              height="340"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1140px',
              top: '244px',
              width: '524px',
              height: '196px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_05.jpg')}
              width="524"
              height="196"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1664px',
              top: '244px',
              width: '200px',
              height: '340px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_06.jpg')}
              width="200"
              height="340"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1864px',
              top: '244px',
              width: '616px',
              height: '1412px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_07.jpg')}
              width="616"
              height="1412"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1140px',
              top: '440px',
              width: '184px',
              height: '272px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_08.jpg')}
              width="184"
              height="272"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1324px',
              top: '440px',
              width: '136px',
              height: '272px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_09.jpg')}
              width="136"
              height="272"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1460px',
              top: '440px',
              width: '204px',
              height: '264px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_10.jpg')}
              width="204"
              height="264"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '584px',
              width: '1020px',
              height: '192px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_11.jpg')}
              width="1020"
              height="192"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1020px',
              top: '584px',
              width: '120px',
              height: '192px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_12.jpg')}
              width="120"
              height="192"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1664px',
              top: '584px',
              width: '200px',
              height: '328px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_13.jpg')}
              width="200"
              height="328"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1460px',
              top: '704px',
              width: '204px',
              height: '168px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_14.jpg')}
              width="204"
              height="168"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1140px',
              top: '712px',
              width: '152px',
              height: '160px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_15.jpg')}
              width="152"
              height="160"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1292px',
              top: '712px',
              width: '168px',
              height: '160px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_16.jpg')}
              width="168"
              height="160"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '776px',
              width: '688px',
              height: '880px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_17.jpg')}
              width="688"
              height="880"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '688px',
              top: '776px',
              width: '452px',
              height: '556px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_18.jpg')}
              width="452"
              height="556"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1140px',
              top: '872px',
              width: '96px',
              height: '268px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_19.jpg')}
              width="96"
              height="268"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1236px',
              top: '872px',
              width: '288px',
              height: '144px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_20.jpg')}
              width="288"
              height="144"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1524px',
              top: '872px',
              width: '140px',
              height: '288px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_21.jpg')}
              width="140"
              height="288"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1664px',
              top: '912px',
              width: '200px',
              height: '248px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_22.jpg')}
              width="200"
              height="248"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1236px',
              top: '1016px',
              width: '288px',
              height: '228px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_23.jpg')}
              width="288"
              height="228"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1140px',
              top: '1140px',
              width: '96px',
              height: '516px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_24.jpg')}
              width="96"
              height="516"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1524px',
              top: '1160px',
              width: '340px',
              height: '496px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_25.jpg')}
              width="340"
              height="496"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '1236px',
              top: '1244px',
              width: '288px',
              height: '412px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_26.jpg')}
              width="288"
              height="412"
              alt=""
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: '688px',
              top: '1332px',
              width: '452px',
              height: '324px',
            }}>
            <img
              src={require('./images/waterberg/waterberg-big_27.jpg')}
              width="452"
              height="324"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Visualize;
