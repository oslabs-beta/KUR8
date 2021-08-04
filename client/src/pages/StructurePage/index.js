import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

import NodeList from '../../components/NodeList';

function StructurePage({ isLoading }) {
  return isLoading ? <LinearProgress color="secondary" /> : <NodeList />;
}

const mapStateToProps = state => ({
  isLoading: state.nodesReducer.isLoading,
});

export default connect(mapStateToProps, null)(StructurePage);
