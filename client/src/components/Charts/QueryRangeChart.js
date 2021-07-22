import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import "zingchart/modules-es6/zingchart-maps.min.js";
import "zingchart/modules-es6/zingchart-maps-usa.min.js";

class QueryRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'line',
        series: [{
          values: [4,5,3,4,5,3,5,4,11]
        }]
      }
    }
  }
  render() {
    console.log('queryrangecharts', this.props.queryrangecharts)
    return (
      <div>
        <ZingChart data={this.state.config}/>
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
