import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Pod from './Pod';

const PodList = ({ pods }) => {
  return (
    <Paper elevation={1}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        {pods.map((pod, index) => (
          <Pod key={`pod-${index}`} {...pod} podIndex={index} />
        ))}
      </Grid>
    </Paper>
  );
};

export default connect(
  state => ({
    pods: state.podsReducer.pods,
  }),
  null
)(PodList);
