import React from 'react';
import Grid from '@material-ui/core/Grid';

import Pod from './Pod';

const PodList = ({ pods, services }) => {
  const clusterIPs = {};
  const containerNames = [];

  // Create an array of containerNames
  pods.forEach(({ containers }) => {
    Object.keys(containers[0]).forEach(name => containerNames.push(name));
  });

  // Match ClusterIp's with the correct podName
  services.forEach((service) => {
    const str = service.metadata.name;
    const nameWithoutSrv = str.substring(0, str.length - 4);

    if (containerNames.includes(nameWithoutSrv)) {
      // Create the clusterIPs object with podNames as a key, and the clusterIP as the value
      clusterIPs[nameWithoutSrv] = service.spec.clusterIP;
    }
  });

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {pods.map((pod, index) => (
        <Pod
          key={`pod-${index}`}
          clusterIP={clusterIPs[containerNames[index]]}
          {...pod}
        />
      ))}
    </Grid>
  );
};

export default PodList;
