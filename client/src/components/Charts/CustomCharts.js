import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

export default function CustomCharts({ customDataArray }) {
  const classes = useStyles();
  const custom = [];

  useEffect(()=> chartBuilder(), [customDataArray])

  const chartBuilder = () => {
    customDataArray.map( (dataSet, index) => {
    const config = {
      type: 'area',
      plot: {
        stacked: true,
        marker: {
          visible: false,
        },
      },
      title: {
        text: 'im custom bro',
      },
      'scale-x': {
        zooming: true,
      },
      'scale-y': {
        item: {
          'font-size': 8,
        },
      },
      series: dataSet.map(dataPoint => {
        return {values: dataPoint.yRange}
      })
    }

    custom.push(
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <ZingChart id={`custom chart ${index}`} data={config} />
        </Paper>
      </Grid>
    )
  })}
  chartBuilder()
  return custom;
}

// export default connect(
//   state => ({
//     customDataArray: state.metricsReducer.customDataArray,
//   }),
//   null
// )(CustomCharts);
