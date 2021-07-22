import React, { useEffect, useState , useContext} from 'react';
import { connect } from 'react-redux';
import CPUGauge from './CPUGauge'

export const CPUSelector = ({ cpuGauge }) => {

  const [nodeID, setNodeID] = useState("Node 1");
  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  console.log(cpuGauge)
  return (
    <div>
      <select value={nodeID} onChange={e => setNodeID(e.target.value)}>
      <option disabled>Select Node</option>
        {cpuGauge.forEach(node => {
          return (
            <option value={node[1]}>{node[1]}</option>
          ) 
        })
        }
      </select>
      <CPUGauge nodeID={nodeID}/>
    </div>

  );
};

