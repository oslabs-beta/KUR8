import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Ingress from './Ingress';
import MasterNode from './MasterNode';
import Pod from '../PodList/Pod';
import WorkerNode from './WorkerNode';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5, 0),
  },
  masterContainer: {
    height: '100%',
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

function NodeList({ pods, services, ingresses, masterNodes, workerNodes }) {
  const classes = useStyles();
  const workerNodePods = {};

  // For masterNode/workerNode setups:
  // The only way to seperate out which pod is scheduled to which node is to target
  // the it's `nodeName` property. This is constructing an object with the keys being
  // the name of each node, with the corrosponding values set to the an array of it's pods.
  pods.forEach(pod => {
    if (workerNodePods[pod.spec.nodeName]) {
      workerNodePods[pod.spec.nodeName].push(pod);
    } else {
      workerNodePods[pod.spec.nodeName] = [pod];
    }
  });

  // For masterNode ONLY setups:
  // If the user is running within a context of a single masterNode and no workerNodes
  // this will render all pods/containers within that node as the primary UI.
  if (!workerNodes.length) {
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
  } else {
    // Otherwise, the primary UI will be composed of masterNodes with multiple workerNodes,
    // with each workerNode producing a list of it's own pods/containers.
    return (
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={3}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center">
              <Ingress ingresses={ingresses} />
              {masterNodes.map(masterProps => (
                <MasterNode
                  key={masterProps.metadata.uid}
                  name={masterProps.metadata.name}
                  processes={masterProps.processes}
                  status={masterProps.status}
                  nodeData={masterProps}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start">
              {workerNodes.map(workerProps => (
                <WorkerNode
                  key={workerProps.metadata.uid}
                  pods={workerNodePods[workerProps.metadata.name]}
                  metadata={workerProps.metadata}
                  services={services}
                  nodeData={workerProps}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  state => ({
    pods: state.podsReducer.pods,
    services: state.servicesReducer.services,
    ingresses: state.ingressesReducer.ingresses,
    masterNodes: state.nodesReducer.masterNodes,
    workerNodes: state.nodesReducer.workerNodes,
  }),
  null
)(NodeList);
