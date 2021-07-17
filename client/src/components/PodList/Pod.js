import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

function Pod({
  name,
  nodeName,
  image,
  state,
  started,
  imageId,
  containerId,
  startTime,
  hostIp,
  phase,
  podIp,
  statusConditions,
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
      <Typography as="body1">Name: {name}</Typography>
      <Typography as="body1">IP: {podIp}</Typography>
    </Paper>
  );
}

export default Pod;
