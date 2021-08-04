import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

import NodeList from '../../components/NodeList';
import { fetchStructurePageData } from '../../actions/nodesActionCreators';

function StructurePage({ isLoading, fetchStructurePageData }) {
  useEffect(() => {
    fetchStructurePageData()
  }, []);
  return isLoading ? <LinearProgress color="secondary" /> : <NodeList />;
}

const mapStateToProps = state => ({
  isLoading: state.nodesReducer.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchStructurePageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StructurePage);
