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
            values: [87]
          }]
        }
      }
      this.chartDone = this.chartDone.bind(this);
    }
    render() {
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
  