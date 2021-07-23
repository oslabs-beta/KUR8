import React, { useState, useEffect } from 'react';
import CPUGauge from './CPUGauge.js';
import { connect } from 'react-redux';

const CPUSelector = ({ cpuGauge }) => {
  const [nodeID, setNodeID] = useState('Node 1');
  const [nodeData , setNodeData] = useState(cpuGauge[0][2])
  console.log('cpuGauge: ', cpuGauge);


  useEffect(() => {
    const findMatchData = (nodeID) => {
      cpuGauge.forEach(node => {
        if (node[1] === nodeID) setNodeData(node[2])
      })
    }

    findMatchData(nodeID);
  }, [nodeID]);


  return (
    <div>
      <select value={nodeID} onChange={e => setNodeID(e.target.value)}>
        <option disabled>Select Node</option>
        {cpuGauge.map((node, index) => {
          return <option key={`note-options-${index}`} value={node[1]}>{node[1]}</option>;
        })}
      </select>
      <CPUGauge nodeID={nodeID} nodeData={nodeData}/>
    </div>
  );
};


export default connect(
  state => ({
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(CPUSelector);
