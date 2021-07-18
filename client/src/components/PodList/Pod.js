import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  outer: {
    background: theme.palette.secondary
  },
  kubernetesShape: {
    height: theme.spacing(20),
    width: theme.spacing(20),
    margin: theme.spacing(1),
    borderRadius: '3px',
    clipPath:
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
  },
}));

function Pod({ containers, metadata, spec, status, podIndex }) {
  const classes = useStyles();
  return (
    <div className={classes.outer}>
      <div className={classes.kubernetesShape} elevation={3}>
        <Typography as="body1">Name: {containers.list[0].name}</Typography>
        <Typography as="body1">podIP: {status.podIP}</Typography>
        <Typography as="body1">hostIP: {status.hostIP}</Typography>
      </div>
    </div>
  );
}

export default Pod;
