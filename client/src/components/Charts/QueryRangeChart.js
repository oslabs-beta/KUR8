import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryRangeChart extends Component {
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
          text: 'The average network traffic received, per second, over the last minute (in bytes)',
        },
        'scale-x': {
          // "values": this.props.queryrangecharts[0].yqueryrange,
          zooming: true,
        },
        'scale-y': {
          // format: '%v \n bytes',
          item: {
            'font-size': 8,
          },
        },
        series: this.props.queryrangecharts.map(dataPoint => {
          return {values: dataPoint.yqueryrange}
        }),
      },
    };
  }
  render() {
    return (
      <div>
        <ZingChart id="queryrangechart" data={this.state.config} />
      </div>
    );
  }
}

export default connect(
  state => ({
    queryrangecharts: state.metricsReducer.queryrangecharts,
  }),
  null
)(QueryRangeChart);
