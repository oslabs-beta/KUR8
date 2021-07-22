import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchData } from './actions/actionCreators';
import GetStartedPage from './pages/GetStartedPage';
import Layout from './components/Layout';
import MetricsPage from './pages/MetricsPage';
import NotFoundPage from './pages/NotFoundPage';
import StructurePage from './pages/StructurePage';

import { metricsFetchData } from './actions/metricsActionCreators';

function App({ fetchData, metricsFetchData }) {
  // On intial load, perform all fetch requests to populate our app with data
  useEffect(() => fetchData('posts.com') , []);
  useEffect(() => metricsFetchData() , []);
  return (
    <Router>
      <Layout> {/* Layout produces our AppBar and Drawer */}
        <Switch>
          <Route exact path="/" component={GetStartedPage} />
          <Route path="/structure" component={StructurePage} />
          <Route path="/metrics" component={MetricsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </Router>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchData, metricsFetchData }, dispatch);

export default connect(null, mapDispatchToProps)(App);
