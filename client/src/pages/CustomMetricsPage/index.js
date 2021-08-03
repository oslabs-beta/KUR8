import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CustomCharts from '../../components/Charts/CustomCharts';
import CustomQuery from '../../components/Charts/CustomQuery';

function CustomMetricsPage({ customDataArray }) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CustomQuery />
      </Grid>
      <CustomCharts customDataArray={customDataArray} />
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    customDataArray: state.metricsReducer.customDataArray,
  };
};

export default connect(mapStateToProps, null)(CustomMetricsPage);
