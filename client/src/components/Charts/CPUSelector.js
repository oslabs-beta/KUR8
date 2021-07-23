import React, { useState, useEffect } from 'react';
import CPUGauge from './CPUGauge.js';
import { connect } from 'react-redux';

const CPUSelector = ({ cpuGauge }) => {
  const [nodeID, setNodeID] = useState('Node 1');
  // const [nodeData , setNodeData] = useState(cpuGauge[0][2])
  console.log('cpuGauge: ', cpuGauge);

  let nodeData;
  const findMatchData = (nodeID) => {
    console.log('nodeid',nodeID)
    setNodeID(nodeID);
    cpuGauge.forEach(node => {
      if (node[1] === nodeID) nodeData = node[2]
    })
  }

  return (
    <div>
      <select value={nodeID} onChange={e => findMatchData(e.target.value)}>
        <option disabled>Select Node</option>
        {cpuGauge.map((node, index) => {
          return <option key={`note-options-${index}`} value={node[1]}>{node[1]}</option>;
        })}
      </select>
      <CPUGauge nodeData={nodeData} nodeID={nodeID} findMatchData={findMatchData}/>
    </div>
  );
};


export default connect(
  state => ({
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(CPUSelector);
