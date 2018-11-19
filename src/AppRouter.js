import React from "react";
import About from "./About";
import Redeem from "./Redeem";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/redeem/">Redeem</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/redeem/:code" component={Redeem} />
      <Route path="/about/" component={About} />
    </div>
  </Router>
);

export default AppRouter;
