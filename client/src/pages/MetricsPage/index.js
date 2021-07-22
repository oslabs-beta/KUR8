
import React from 'react';
// import {CPUGauge} from './Components/CPUGauge';
// import {MemoryGauge} from './Components/Memory'
// import CounterChart from '../../components/Charts/CounterChart'
// import GaugeChart from '../../components/Charts/GaugeChart'
// import HistogramChart from '../../components/Charts/HistogramChart'
// import QueryRangeChart from '../../components/Charts/QueryRangeChart'
import {CPUSelector} from './Components/CPUSelector';

function MetricsPage() {
  return (
    <div>
      metrics page
      {/* <CPUGauge />
      <MemoryGauge />
      <CounterChart />
      <GaugeChart /> */}
      <CPUSelector />

      {/* <HistogramChart /> */}
      {/* <QueryRangeChart /> */}
    </div>
  )
}

export default MetricsPage;
