import React from 'react';
import {CPUGauge} from './Components/cpu.jsx';
import {MemoryGauge} from './Components/memory.jsx'

function MetricsPage() {
  return (
    <div>
      metrics page
      <CPUGauge />
      <MemoryGauge />
    </div>
  )
}

export default MetricsPage;
