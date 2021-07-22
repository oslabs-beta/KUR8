import React, { useState } from 'react';
import CPUGauge from './CPUGauge.js';

const CPUSelector = ({ cpuGauge }) => {
  const [nodeID, setNodeID] = useState('Node 1');
  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  console.log('cpuGauge: ', cpuGauge);
  return (
    <div>
      <select value={nodeID} onChange={e => setNodeID(e.target.value)}>
        <option disabled>Select Node</option>
        {cpuGauge.map(node => {
          return <option value={node[1]}>{node[1]}</option>;
        })}
      </select>
      <CPUGauge nodeID={nodeID} />
    </div>
  );
};

export default CPUSelector;
