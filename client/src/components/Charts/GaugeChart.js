import React from 'react';
import { connect } from 'react-redux';

const GaugeChart = ({ defaultcharts, querycharts }) => {

  return (
    <div>
      im a gauge chart
      {defaultcharts}
      {querycharts}
    </div>
  );
};

export default connect(
  state => ({
    defaultcharts: state.metricsReducer.defaultcharts,
    querycharts: state.metricsReducer.querycharts,
  }),
  null
)(GaugeChart);
