import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Pod from './Pod';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
  },
}));

const PodList = ({ pods }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={1}>
      <Typography>Node</Typography>
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
