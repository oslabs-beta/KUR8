import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import React, {Component} from 'react';

export class MemoryGauge extends Component {
    
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
  