import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import SingleNode from './SingleNode';
import MasterNode from './MasterNode';
import WorkerNode from './WorkerNode';
import Ingress from './Ingress';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200],
  },
  masterContainer: {
    height: '100%',
  },
  ingressContainer: {
    padding: theme.spacing(3, 0),
  },
  masterNodesContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0, 3),
    },
  },
  workerNodesContainer: {
    [theme.breakpoints.down(1300)]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
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
      <SingleNode
        masterNodeData={masterNodes}
        ingresses={ingresses}
        services={services}
        pods={pods}
      />
    );
  } else {
    // Otherwise, the primary UI will be composed of masterNodes with multiple workerNodes,
    // with each workerNode producing a list of it's own pods/containers.
    return (
      <Paper className={classes.paper} square>
        <Grid container direction="row">
          <Grid
            container
            className={classes.masterNodesContainer}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sm={12}
            md={3}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
              <Chip
                variant="outlined"
                size="medium"
                label="Cluster Environment"
              />
            </Grid>
            <Grid item direction="row">
              {masterNodes.map((masterProps, index) => (
                <MasterNode
                  id={index}
                  key={masterProps.metadata.uid}
                  name={masterProps.metadata.name}
                  processes={masterProps.processes}
                  status={masterProps.status}
                  nodeData={masterProps}
                />
              ))}
            </Grid>
            <Grid item direction="row" className={classes.ingressContainer}>
              <Ingress ingresses={ingresses} />
            </Grid>
          </Grid>
          <Grid item sm={12} md={9}>
            <Grid
              container
              className={classes.workerNodesContainer}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start">
              {workerNodes.map((workerProps, index) => (
                <WorkerNode
                  id={index}
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
