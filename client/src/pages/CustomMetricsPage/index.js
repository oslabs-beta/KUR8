import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import { fetchProm } from '../../actions/metricsActionCreators';
import CustomCharts from '../../components/Charts/CustomCharts';
import CustomQuery from '../../components/Charts/CustomQuery';

function CustomMetricsPage({ fetchProm, customDataArray }) {
  useEffect(() => fetchProm(), []);

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomMetricsPage);
