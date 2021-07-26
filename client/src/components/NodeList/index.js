import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import MasterNode from './MasterNode';
import WorkerNode from './WorkerNode';
import Ingress from './Ingress';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5, 0),
  },
  masterContainer: {
    height: '100%',
  },
}));

function NodeList({ pods, services, ingresses, masterNodes, workerNodes }) {
  const classes = useStyles();
  const workerNodePods = {};

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
