import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Home from './pages/Home';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>

        <Route exact path="/details/:id">
          {(routerProps) => <Details { ...routerProps } />}
        </Route>

        <Route exact path="/checkout">
          <Checkout />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
