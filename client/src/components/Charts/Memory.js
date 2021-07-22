import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import React, {Component} from 'react';

export default class MemoryGauge extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        config: {
          type: 'gauge',
          title: {
            text: 'Memory usage in %'
          },
          "scale": {
            "size-factor": 0.9
          },
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
          <ZingChart data={this.state.config} complete={this.chartDone}/>
        </div>
      );
    }
    chartDone(event) {
      console.log(`Event "Complete" - The chart is rendered\n`);
    }
  }
  