import React from 'react'
import { Route, Link } from 'react-router-dom'
import Chart from '../chart'
import Chat from '../chat'
import Login from '../login'
import Home from '../home'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/chart">Chart</Link>
      <Link to="/chat">Chat</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/chart" component={Chart} />
      <Route exact path="/chat" component={Chat} />
    </main>
  </div>
);

export default App
