import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GetStartedPage from './pages/GetStartedPage';
import Layout from './components/Layout';
import MetricsPage from './pages/MetricsPage';
import NotFoundPage from './pages/NotFoundPage';
import StructurePage from './pages/StructurePage';

export default function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/" component={GetStartedPage} />
          <Route path="/structure" component={StructurePage} />
          <Route path="/metrics" component={MetricsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Layout>
  );
}
