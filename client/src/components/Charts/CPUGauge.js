import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class CPUGauge extends Component {
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
            values: [Number(this.props.nodeData)],
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

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {

    return (
      <div>
        <ZingChart data={this.state.config} complete={this.chartDone} />
      </div>
    );
  }
  chartDone(event) {
    console.log(`Event "Complete" - The chart is rendered\n`);
  }
}
export default CPUGauge;
