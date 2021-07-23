import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

export class CPUGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'gauge',
        title: {
          text: 'CPU usage in %',
        },
        scale: {
          'size-factor': 0.9,
        },
        series: [
          {
            values: [Number(this.props.cpuGauge[0][2])],
          },
        ],
          'scale-r': {
            aperture: 200,     //Specify your scale range.
            values: "0:100:20" //Provide min/max/step scale values.
          }
      },
    };
    this.chartDone = this.chartDone.bind(this);
  }


  // componentDidUpdate
  updateGauge = (nodeID) => {

    cpuGauge.forEach(node => {
      if (node[1] === nodeID) nodeData = node[2]
    })

    this.setState({
      config: {
        type: 'gauge',
        title: {
          text: 'CPU usage in %',
        },
        scale: {
          'size-factor': 0.9,
        },
        series: [
          {
            values: [Number(nodeData)],
          },
        ],
          'scale-r': {
            aperture: 200,     //Specify your scale range.
            values: "0:100:20" //Provide min/max/step scale values.
          }
      },
    });


  }

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {

    return (
      <div>
          <div>
            <select value={e.target.value} onChange={e => this.updateGauge(e.target.value)}>
            <option disabled>Select Node</option>
            {this.props.cpuGauge.map((node, index) => {
              return <option key={`note-options-${index}`} value={node[1]}>{node[1]}</option>;
            })}
          </select>
        </div>

        <div>
          <ZingChart data={this.state.config} complete={this.chartDone} />
        </div>
      </div>
    );
  }
  chartDone(event) {
    console.log(`Event "Complete" - The chart is rendered\n`);
  }
}

export default connect(
  state => ({
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(CPUGauge);

