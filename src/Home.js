import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="Home narrow">
        <h1>Refreshing memories of "MARK ZUCKERBERG"</h1>
        <p>
          It's the year 2055.
          <br />
          MARK ZUCKERBERG uploaded itself in the Ethereum Network because
          blockchain and stuff and user data and Ads.
          <br />
          HELP US finding The MARK pieces and stop it!
          <br />
        </p>
        <p>
          Each piece of Mark (a ZUCKERBIT) is a token. You can find them by
          searching QR codes about MARK at the CCC. You will recognize them as
          soon as you find them.
          <br />
          We will send out hints on Twitter every once in a while from Twitter{" "}
          <a href="https://twitter.com/dist0rtionproto">@distortionproto</a> and
          #huntzuckerberg.
          <br />
          Each token can be redeemed with and Ethereum transaction (so you will
          need wallet enabled browser and some Ether on Rinkeby).
          <br />
          Once you find a ZUCKERBIT, you can come to the Social Dist0rtion
          Protocol assembly to claim your bounty. The bounty hunter with the
          most ZUCKERBITS, will get a YUBI key!!!111 one
        </p>
        <h1>Requirements</h1>
        <ul>
          <li>
            A wallet enabled browser or extension: Metamask on desktop, Cipher
            on mobile
          </li>
          <li>
            An Ethereum wallet with Ether on the Rinkeby test network, so no
            real money involved. We can also send you some if you need.
          </li>
        </ul>
        <h1>Support</h1>
        <ul>
          <li>
            Come to the{" "}
            <a href="https://35c3.c3nav.de/l/social-dist0rtion-protocol/">
              Social Dist0rtion Protocol assembly
            </a>{" "}
            if you want to talk to <b>real people</b>.
          </li>
          <li>DECT number: 8960</li>
          <li>
            If you need Ether for the Rinkey network you can either:
            <ul>
              <li>
                Go to{" "}
                <a href="https://faucet.rinkeby.io/">
                  https://faucet.rinkeby.io/
                </a>
              </li>
              <li>
                Ask us on{" "}
                <a
                  href="
https://twitter.com/dist0rtionproto"
                >
                  twitter
                </a>{" "}
                or come to our assembly.
              </li>
            </ul>
          </li>
        </ul>
        <h1>Bounties</h1>
        <ul>
          <li>
            For each unlocked ZUCKERBIT:
            <ul>
              <li>Grappa</li>
              <li>Berliner Luft</li>
              <li>Pfefferminz</li>
              <li>Maybe other stuff? :j</li>
            </ul>
          </li>
          <li>
            For the winner (most ZUCKERBITS collected): a brand new{" "}
            <b>Yubi Key</b> + the remaining bounties.
          </li>
        </ul>
        <h1>Technical stuff</h1>
        <p>
          We are running the web application as a rich js client getting the
          state from the Ethereum. The whole progress of the hunt is
          transparently tracked and updated with Ethereum smart contracts.
          Because you deserve trust.
        </p>
        <p>
          Check out the code on{" "}
          <a href="https://github.com/social-dist0rtion-protocol/hunt-zuckerberg">
            GitHub
          </a>
          .
        </p>
      </div>
    );
  }
}

export default Home;
