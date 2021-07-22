import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import "zingchart/modules-es6/zingchart-maps.min.js";
import "zingchart/modules-es6/zingchart-maps-usa.min.js";



export class CPUGauge extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        config: {
          type: 'gauge',
          series: [{
            values: [this.props.cpuGauge[1][2]]
          }]
        }
      }
      this.chartDone = this.chartDone.bind(this);
    }

      //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
    render() {
      let innerArr = this.props.cpuGauge.filter(node => {
        node[1] === this.props.node;
      })

      let targetVal = innerArr[2];

      this.setState({
        config: {
          type: 'gauge',
          series: [{
            values: [targetVal]
      }]
    }
  })

      return (
        <div>
        <h1>yooooooo</h1>
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