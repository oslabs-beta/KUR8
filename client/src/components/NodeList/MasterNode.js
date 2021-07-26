import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PodList from '../PodList';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
  },
  chipNodeName: {
    boxShadow: theme.shadows[3],
  },
  kubernetesShapeWrap: {
    filter: 'drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5))',
  },
  kubernetesShape: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(25),
    width: theme.spacing(25),
    margin: theme.spacing(3, 0),
    background: 'rgb(146, 113, 46)',
    clipPath:
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
  },
  title: {
    color: '#fff',
  },
  chipNodeName: {
    color: '#fff',
    borderColor: '#fff',
    margin: '15px 0px',
    boxShadow: theme.shadows[3],
  },
}));

function MasterNode({ name, processes, status }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.kubernetesShapeWrap}>
        <div className={classes.kubernetesShape} elevation={3}>
          <Chip
            className={classes.chipNodeName}
            variant="outlined"
            size="medium"
            label={name}
          />
          <Typography className={classes.title}>Master</Typography>
        </div>
      </div>
    </>
  );
}

export default MasterNode;
