import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryCpuRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'area',
        plot: {
          stacked: true,
          marker: {
            visible: false,
          },
        },
        title: {
          text: 'The average amount of CPU time spent in system mode, per second, over the last minute (in seconds)',
        },
        'scale-x': {
          // "values": this.props.cpuRangeChart[0].ycpurange,
          zooming: true,
        },
        'scale-y': {
          // format: '%v \n bytes',
          item: {
            'font-size': 8,
          },
        },
        series: this.props.cpuRangeChart.map(dataPoint => {
          // console.log(`dataPoint.ycpurange`, dataPoint.ycpurange)
          return {values: dataPoint.ycpurange}
        }),
      },
    };
  }
  render() {
    // console.log('cpuRangeChart', this.props.cpuRangeChart);
    const checkme = this.props.cpuRangeChart.map(dataPoint => {
      // console.log(`dataPoint.ycpurange`, dataPoint.ycpurange)
      return dataPoint.ycpurange
    })
    // console.log('imcheckme', checkme)
    return (
      <div>
        <ZingChart id="querycpurangechart" data={this.state.config} />
      </div>
    );
  }
}

export default connect(
  state => ({
    cpuRangeChart: state.metricsReducer.cpuRangeChart,
  }),
  null
)(QueryCpuRangeChart);
