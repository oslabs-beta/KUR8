import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    height: theme.spacing(30),
    width: theme.spacing(30),
  },
}));

function Pod({ containers, metadata, spec, status, podIndex }) {
  const classes = useStyles();
  console.log(`status`, status);
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography as="body1">Name: {containers.list[0].name}</Typography>
      <Typography as="body1">podIP: {status.podIP}</Typography>
      <Typography as="body1">hostIP: {status.hostIP}</Typography>
    </Paper>
  );
}

export default Pod;
