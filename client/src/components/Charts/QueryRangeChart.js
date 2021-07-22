import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'area',
        plot: { stacked: true },
        series: [
          { 
            values: [20, 40, 25, 50, 15, 45, 33, 34] 
          },
          { 
            values: [5, 30, 21, 18, 59, 50, 28, 33] 
          },
          { 
            values: [30, 5, 18, 21, 33, 41, 29, 15] 
          },
        ],
      },
    };
  }
  render() {
    console.log('queryrangecharts', this.props.queryrangecharts);
    return (
      <div>
        <ZingChart data={this.state.config} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    queryrangecharts: state.metricsReducer.queryrangecharts,
  }),
  null
)(QueryRangeChart);
