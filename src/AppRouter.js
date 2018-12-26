import React from "react";
import About from "./About";
import Redeem from "./Redeem";
import NotFound from "./NotFound";
import Visualize from "./Visualize";
import LeaderBoard from "./LeaderBoard";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Index = () => <h2>Home</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <header>
        <h1>Hunt Zuckerberg</h1>
        <h2>35c3 treasure hunt game!</h2>
        <nav>
          <ul>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/about/`}>About</Link>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/visualize/`}>Visualize</Link>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/leader-board/`}>
                Leader Board
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/`} exact component={Index} />
          <Route
            path={`${process.env.PUBLIC_URL}/redeem/:token`}
            component={Redeem}
          />
          <Route path={`${process.env.PUBLIC_URL}/about/`} component={About} />
          <Route
            path={`${process.env.PUBLIC_URL}/visualize/`}
            component={Visualize}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/leader-board/`}
            component={LeaderBoard}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default AppRouter;
