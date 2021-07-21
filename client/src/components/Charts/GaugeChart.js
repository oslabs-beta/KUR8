import React from 'react';
import { connect } from 'react-redux';

const GaugeChart = ({ defaultcharts, querycharts, queryrangecharts }) => {

  return (
    <div>
      im a gauge chart
      {querycharts}
      {queryrangecharts}
    </div>
  );
};

export default connect(
  state => ({
    defaultcharts: state.metricsReducer.defaultcharts,
    querycharts: state.metricsReducer.querycharts,
    queryrangecharts: state.metricsReducer.queryrangecharts,
  }),
  null
)(GaugeChart);
