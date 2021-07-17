import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import Pod from './Pod';

const PodList = ({ pods }) => (
  <Paper elevation={1}>
    {pods.map(pod => (
      <Pod {...pod} />
    ))}
  </Paper>
);

export default connect(state => ({ pods: state.pods }), null)(PodList);
