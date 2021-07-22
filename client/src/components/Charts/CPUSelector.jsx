import { useEffect, useState , useContext} from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import "zingchart/modules-es6/zingchart-maps.min.js";
import "zingchart/modules-es6/zingchart-maps-usa.min.js";

export const Selector = ({ cpuGauge }) => {

  const [nodeID, setNodeID] = useState("Node 1");
  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]

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
    </div>
  );
};

export default connect(
  state => ({
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(Selector);
