import React from 'react'
import CounterChart from '../../components/Charts/CounterChart'
import GaugeChart from '../../components/Charts/GaugeChart'
import HistogramChart from '../../components/Charts/HistogramChart'
import QueryRangeChart from '../../components/Charts/QueryRangeChart'

function MetricsPage() {
  return (
    <div>
      <CounterChart />
      <GaugeChart />
      <HistogramChart />
      {/* <QueryRangeChart /> */}
    </div>
  )
}

export default MetricsPage
