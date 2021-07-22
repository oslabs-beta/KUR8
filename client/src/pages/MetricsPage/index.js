import React, { useEffect} from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { metricsFetchData } from '../../actions/metricsActionCreators';

import {CPUGauge} from './Components/CPUGauge.jsx';
import {MemoryGauge} from './Components/Memory.jsx'
import CounterChart from '../../components/Charts/CounterChart'
import GaugeChart from '../../components/Charts/GaugeChart'
import HistogramChart from '../../components/Charts/HistogramChart'
import QueryRangeChart from '../../components/Charts/QueryRangeChart'
import CPUSelector from './Components/CPUSelector.jsx';


function MetricsPage() {
  // useEffect(() => metricsFetchData() , []);
  return (
    <div>
      metrics page
      {/* <CPUGauge />
      <MemoryGauge />
      <CounterChart />
      <GaugeChart /> */}
      {/* <CPUSelector /> */}

      <HistogramChart />
      <QueryRangeChart />
    </div>
  )
}

export default MetricsPage;
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ metricsFetchData }, dispatch);

// export default connect(null, mapDispatchToProps)(MetricsPage);
