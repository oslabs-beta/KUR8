import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Pod from './Pod';

const useStyles = makeStyles(theme => ({
  noPodsMessage: {
    margin: theme.spacing(2),
  },
}));

const PodList = ({ pods, services }) => {
  const classes = useStyles();
  const clusterIPs = {};
  const containerNames = [];
  let renderedPods;

  if (pods) {
    // Create an array of containerNames
    pods.forEach(({ containers }) => {
      Object.keys(containers[0]).forEach(name => containerNames.push(name));
    });

    // Match ClusterIp's with the correct podName
    services.forEach(service => {
      const str = service.metadata.name;
      const nameWithoutSrv = str.substring(0, str.length - 4);

      if (containerNames.includes(nameWithoutSrv)) {
        // Create the clusterIPs object with podNames as a key, and the clusterIP as the value
        clusterIPs[nameWithoutSrv] = service.spec.clusterIP;
      }
    });

    renderedPods = pods.map((pod, index) => (
      <Pod
        key={`pod-${index}`}
        clusterIP={clusterIPs[containerNames[index]]}
        {...pod}
      />
    ));
  } else {
    renderedPods = (
      <Typography className={classes.noPodsMessage}>
        No pods have been allocated to this node
      </Typography>
    );
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {renderedPods}
    </Grid>
  );
};

export default PodList;
