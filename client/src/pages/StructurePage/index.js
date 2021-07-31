import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NodeList from '../../components/NodeList'
// import SearchBar from '../../components/SearchBar'

const useStyles = makeStyles(theme => ({
  sampleStyle: {
    color: '#000',
  },
}));

export default function StructurePage() {
  const classes = useStyles();

  return (
    <div>
      {/* <SearchBar /> */}
      <NodeList />
    </div>
  );
}
