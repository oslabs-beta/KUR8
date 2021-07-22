import React from 'react';
import {CPUGauge} from './Components/CPUGauge';
import {MemoryGauge} from './Components/Memory'
import CounterChart from '../../components/Charts/CounterChart'
import {GaugeChart} from '../../components/Charts/GaugeChart'
import {HistogramChart} from '../../components/Charts/HistogramChart'
import {QueryRangeChart} from '../../components/Charts/QueryRangeChart'
import {CPUSelector} from './Components/CPUSelector';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { CPUGauge } from './Components/cpu.jsx';
import { MemoryGauge } from './Components/memory.jsx';
import CounterChart from '../../components/Charts/CounterChart';
import GaugeChart from '../../components/Charts/GaugeChart';
import HistogramChart from '../../components/Charts/HistogramChart';
import QueryRangeChart from '../../components/Charts/QueryRangeChart';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '512px',
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

function MetricsPage() {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Grid item>
          <Paper className={classes.halfedTop}>
            <CounterChart />
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.halfedBottom}>
            <GaugeChart />
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <QueryRangeChart />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <HistogramChart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <CPUGauge />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <MemoryGauge />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MetricsPage;
// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ metricsFetchData }, dispatch);

// export default connect(null, mapDispatchToProps)(MetricsPage);
