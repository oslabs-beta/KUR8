import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import HistogramChart from '../../components/Charts/HistogramChart';
import CPUGauge from '../../components/Charts/CPUGauge';
import QueryRangeChart from '../../components/Charts/QueryRangeChart';
import QueryCpuRangeChart from '../../components/Charts/QueryCpuRangeChart';
import TotalHTTPRequest from '../../components/Charts/TotalHTTPRequest';
import CPUContainer from '../../components/Charts/CPUContainer';
import PodByNamespace from '../../components/Charts/PodByNamespace';
import PodsNotReady from '../../components/Charts/PodsNotReady';
import MemoryNode from '../../components/Charts/MemoryNode';
import { metricsFetchData } from '../../actions/metricsActionCreators';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '560px',
  },
  halfedTop: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '248px',
  },
  halfedBottom: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '248px',
  },
}));

const circleSpinner = (
  <CircularProgress
    color="secondary"
    style={{ height: '100px', width: '100px' }}
    justify="center"
  />
);

function MetricsPage({ metrics, metricsFetchData, isLoading }) {
  const classes = useStyles();
  useEffect(() => {
    metricsFetchData();
  }, []);

  if (isLoading) return <LinearProgress color="secondary" />;
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <QueryCpuRangeChart cpuRangeChart={metrics.cpuRangeChart} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <QueryRangeChart querycharts={metrics.querycharts} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <HistogramChart defaultcharts={metrics.defaultcharts} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <CPUGauge cpuGauge={metrics.cpuGauge} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <PodByNamespace podPerNamespace={metrics.podPerNamespace} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <TotalHTTPRequest httpRequestData={metrics.httpRequestData} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <CPUContainer cpuContainer={metrics.cpuContainer} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <PodsNotReady podNotReady={metrics.podNotReady} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {metrics.defaultcharts.length ? (
            <MemoryNode memoryNode={metrics.memoryNode} />
          ) : (
            circleSpinner
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    metrics: state.metricsReducer,
    isLoading: state.metricsReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ metricsFetchData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MetricsPage);
