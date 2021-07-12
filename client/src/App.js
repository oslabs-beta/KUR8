import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../src/pages/Home'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
