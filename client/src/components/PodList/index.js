import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Pod from './Pod';
import Ingress from './Ingress'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
  },
  ingressContainer: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(5, 0),
    height: '50px',
    width: '200px',
    borderRadius: '25px',
    boxShadow: theme.shadows[3],
  },
}));

const PodList = ({ pods, services, ingresses }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={1}>
      <Typography>Node</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Ingress ingresses={ingresses} />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        {pods.map((pod, index) => {
          return (
            <Pod
              key={`pod-${index}`}
              clusterIP={services[index].spec.clusterIP}
              {...pod}
            />
          );
        })}
      </Grid>
    </Paper>
  );
};

export default connect(
  state => ({
    pods: state.podsReducer.pods,
    services: state.servicesReducer.services,
    ingresses: state.ingressesReducer.ingresses
  }),
  null
)(PodList);
