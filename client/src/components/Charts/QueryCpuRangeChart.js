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
            "line-width": 2,
            "marker": {
              "size": 1,
              "visible": false
            },
            "tooltip": {
              "font-family": "Roboto",
              "font-size": "15px",
              "text": "There were %v %t on %data-days",
              "text-align": "left",
              "border-radius": 5,
              "padding": 10
            },
            marker: {
              visible: false,
          },
        },
        "plotarea": {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            "visible": false
          }
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
          return {values: dataPoint.ycpurange}
        }),
      },
    };
  }
  render() {
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
