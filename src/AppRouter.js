import React from 'react';
import Home from './Home';
import Redeem from './Redeem';
import NotFound from './NotFound';
import Visualize from './Visualize';
import LeaderBoard from './LeaderBoard';
import ConfettiCanvas from "./ConfettiCanvas";
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <div>
      <ConfettiCanvas />
      <header>
        <h1>Hunt Zuckerberg</h1>
        <h2>35c3 treasure hunt game!</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">The Game</Link>
            </li>
            <li>
              <Link to="/visualize/">Current State</Link>
            </li>
            <li>
              <Link to="/leader-board/">Leader Board</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/redeem/:token" component={Redeem} />
          <Route path="/visualize/" component={Visualize} />
          <Route path="/leader-board/" component={LeaderBoard} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default AppRouter;
