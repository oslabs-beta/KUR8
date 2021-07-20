import React from 'react'
import CounterChart from '../../components/Charts/CounterChart'
import GaugeChart from '../../components/Charts/GaugeChart'
import HistogramChart from '../../components/Charts/HistogramChart'

function MetricsPage() {
  return (
    <div>
      <CounterChart />
      <GaugeChart />
      <HistogramChart />
    </div>
  )
}

export default MetricsPage
