import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import HistogramChart from '../../components/Charts/HistogramChart';
import MemoryGauge from '../../components/Charts/MemoryNode';
import CPUGauge from '../../components/Charts/CPUGauge';
import QueryRangeChart from '../../components/Charts/QueryRangeChart';
import QueryCpuRangeChart from '../../components/Charts/QueryCpuRangeChart';
import TotalHTTPRequest from '../../components/Charts/TotalHTTPRequest';
import CPUContainer from '../../components/Charts/CPUContainer';
import PodByNamespace from '../../components/Charts/PodByNamespace';
import PodsNotReady from '../../components/Charts/PodsNotReady';
import MemoryNode from '../../components/Charts/MemoryNode';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '622px',
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

function MetricsPage({ cpuGauge }) {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <QueryCpuRangeChart />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <QueryRangeChart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <HistogramChart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <CPUGauge cpuGauge={cpuGauge} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <PodByNamespace />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <TotalHTTPRequest />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <CPUContainer />
        </Paper>
      </Grid>

      {/* <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <MemoryGauge />
        </Paper>
      </Grid>  */}

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {/* <PodsNotReady /> */}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <MemoryNode />
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  console.log(`state`, state);
  return {
    cpuGauge: state.metricsReducer.cpuGauge,
    // customDataArray: state.metricsReducer.customDataArray,
  };
};

export default connect(mapStateToProps, null)(MetricsPage);
