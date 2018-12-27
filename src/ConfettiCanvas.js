import React from "react";
import sizeMe from "react-sizeme";
import Confetti from "react-confetti";

const ConfettiCanvas = sizeMe({
  monitorHeight: true,
  monitorWidth: true
})(
  class Example extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { confetti: "0%" };
    }

    componentDidMount() {
      // I'm so sorry
      setInterval(() => {
        this.setState({ confetti: window.confetti });
      }, 100);
    }
    render() {
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: this.state.confetti
          }}
        >
          <Confetti {...this.props.size} />
        </div>
      );
    }
  }
);

export default ConfettiCanvas;
