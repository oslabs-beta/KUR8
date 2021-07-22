import React, { Component } from 'react';
import 'zingchart/es6';
import { connect } from 'react-redux';
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
          text: 'CPU usage in %'
        },
        "scale": {
          "size-factor": 0.9
        },
        series: [
          {
            // values: [this.props.cpuGauge[1][2]]
            values: [
              this.props.cpuGauge.filter(node => {
                node[1] === this.props.nodeID;
              })[2],
            ],
          },
        ],
      },
    };
    this.chartDone = this.chartDone.bind(this);
  }

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {
    //     let innerArr = this.props.cpuGauge.filter(node => {
    //       node[1] === this.props.nodeID;
    //     })

    //     let targetVal = innerArr[2];

    //     this.setState({
    //       config: {
    //         type: 'gauge',
    //         series: [{
    //           values: [targetVal]
    //     }]
    //   }
    // })

    return (
      <div>
        <ZingChart data={this.state.config} complete={this.chartDone}/>
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
