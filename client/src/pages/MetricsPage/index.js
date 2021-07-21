
import React from 'react';
import {CPUGauge} from './Components/cpu.jsx';
import {MemoryGauge} from './Components/memory.jsx'

import CounterChart from '../../components/Charts/CounterChart'
import GaugeChart from '../../components/Charts/GaugeChart'
import HistogramChart from '../../components/Charts/HistogramChart'
import QueryRangeChart from '../../components/Charts/QueryRangeChart'

function MetricsPage() {
  return (
    <div>
      metrics page
      <CPUGauge />
      <MemoryGauge />
      <CounterChart />
      <GaugeChart />
      <HistogramChart />
      {/* <QueryRangeChart /> */}
    </div>
  )
}

export default MetricsPage;
