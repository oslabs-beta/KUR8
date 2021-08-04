import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';

import { fetchProm } from '../../actions/metricsActionCreators';
import CustomCharts from '../../components/Charts/CustomCharts';
import CustomQuery from '../../components/Charts/CustomQuery';

const useStyles = makeStyles(theme => ({
  customMetricsPageRoot: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200],
  },
}));

function CustomMetricsPage({ fetchProm, customDataArray }) {
  const classes = useStyles();
  useEffect(() => fetchProm(), []);

  return (
    <Paper className={classes.customMetricsPageRoot}>
      <CustomQuery />
      <CustomCharts customDataArray={customDataArray} />
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    customDataArray: state.metricsReducer.customDataArray,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomMetricsPage);
