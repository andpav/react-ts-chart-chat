// @flow

import React from 'react';
import { Route, Link } from 'react-router-dom';
import Chart from '../chart';
import Chat from '../chat';
import Login from '../login';
import Home from '../home';
import SignInRequired from '../SignInRequired';
import SignOutRequired from '../SignOutRequired';

import './app.css';

const App = (): React$Element<*> => (
  <div>
    <header>
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/login">Login</Link>
      <Link className="link" to="/chart">Chart</Link>
      <Link className="link" to="/chat">Chat</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={SignOutRequired(Login)} />
      <Route exact path="/chart" component={SignInRequired(Chart)} />
      <Route exact path="/chat" component={SignInRequired(Chat)} />
    </main>
  </div>
);

export default App;
