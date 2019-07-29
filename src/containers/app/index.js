import React from 'react'
import { Route, Link } from 'react-router-dom'
import Chart from '../chart'
import Login from '../login'
import Home from '../home'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/chart">Chart</Link>
      <Link to="/login">Login</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/chart" component={Chart} />
      <Route exact path="/login" component={Login} />
    </main>
  </div>
);

export default App
