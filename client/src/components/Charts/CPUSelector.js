import React, { useState, useEffect } from 'react';
import CPUGauge from './CPUGauge.js';
import { connect } from 'react-redux';

const CPUSelector = ({ cpuGauge }) => {
  const [nodeID, setNodeID] = useState('Node 1');
  const [nodeData , setNodeData] = useState(cpuGauge[0][2])
  console.log('cpuGauge: ', cpuGauge);

  const findMatchData = (e, nodeID) => {
    setNodeID(e.target.value);
    cpuGauge.forEach(node => {
      if (node[1] === nodeID) setNodeData(node[2])
    })
  }

  return (
    <div>
      <select value={nodeID} onChange={findMatchData(e, nodeID)}>
        <option disabled>Select Node</option>
        {cpuGauge.map((node, index) => {
          return <option key={`note-options-${index}`} value={node[1]}>{node[1]}</option>;
        })}
      </select>
      <CPUGauge nodeData={nodeData}/>
    </div>
  );
};


export default connect(
  state => ({
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(CPUSelector);
