import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCustom } from '../../actions/metricsActionCreators';
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

function CustomCharts({ customDataArray, deleteCustom }) {
  const classes = useStyles();
  const custom = [];

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
        text: dataSet[0].metric.__name__
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
//
    custom.push(
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <button
          onClick={() => deleteCustom(index)}
          >delete</button>
          <ZingChart id={`custom chart ${index}`} data={config} />
        </Paper>
      </Grid>
    )
  })
  return custom;
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteCustom }, dispatch);

  export default connect(null, mapDispatchToProps)(CustomCharts);