import React from 'react';
import About from './About';
import Redeem from './Redeem';
import Visualize from './Visualize';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/redeem/">Redeem</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/visualize/">Visualize</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Route path="/" exact component={Index} />
        <Route path="/redeem/:code" component={Redeem} />
        <Route path="/about/" component={About} />
        <Route path="/visualize/" component={Visualize} />
      </main>
    </div>
  </Router>
);

export default AppRouter;
