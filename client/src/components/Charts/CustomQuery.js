import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { fetchCustomQuery, hyrateCustom } from '../../actions/metricsActionCreators';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() => ({
  input: {
    height: 50
  }
}));

function CustomQuery({ fetchCustomQuery, allPromQL, customDataArray, hyrateCustom }) {

  useEffect(() => {
    const retrieveStash = localStorage.getItem('customcharts');
    if (retrieveStash) {
      hyrateCustom(JSON.parse(retrieveStash))
    };
  },[]);

  useEffect(() => {
    localStorage.setItem('customcharts', JSON.stringify(customDataArray));
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [range, setRange] = useState('Range');
  const [step, setStep] = useState('Step');

  const handleNesting = () => {
    setOpen(!open);
  };

  const handleQueryChange = (event, selectedObject) => {
    setQuery(selectedObject)
  }

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleStepChange = (event) => {
    setStep(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log( 'query:', query, 'range: ', range, 'step', step); 
    fetchCustomQuery(query, range, step);
  }

  const ranges = [1,2,3,4,8,12,18,24];
  const steps = [15,30,60,120];

  return (
    <List>
      <ListItem id="addnewchart" button onClick={handleNesting}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Chart" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse id='collapse' in={open} timeout="auto" unmountOnExit>
        <ListItem button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Autocomplete
              id="autocomplete-query"
              freeSolo
              // fullWidth={true}
              style = {{width: 1000}}
              value={query}
              onChange={handleQueryChange}
              options={allPromQL.map((option) => option)}
              renderOption={option => option}
              renderInput={(params) => (
                <TextField {...params} label="Enter Prometheus Query" margin="normal" variant="outlined" className={classes.input}/>
              )}
            />
            <Select
              id="select-range"
              value={range}
              onChange={handleRangeChange}
              label="Choose a time range"
              variant="outlined"
              className={classes.input}
            >
            <MenuItem value="Range">
            <em>Select a time range</em>
            </MenuItem>
              {ranges.map((ranges) => (
                <MenuItem key={ranges} value={ranges}>
                  {`${ranges} hours`}
                </MenuItem>
              ))}
            </Select>
            <Select
              id="select-step"
              value={step}
              onChange={handleStepChange}
              label="Choose a step interval"
              variant="outlined"
              className={classes.input}
            >
              <MenuItem value="Step">
              <em>Select a step interval</em>
              </MenuItem>
              {steps.map((steps) => (
                <MenuItem key={steps} value={steps}>
                  {`${steps} seconds`}
                </MenuItem>
              ))}
            </Select>
            <Button
              id="submit-custom"
              type="submit"
              variant="outlined"
              className={classes.input}
              style={{marginBottom:4}}
            >
              Submit
            </Button>
          </form>
        </ListItem>
      </Collapse>
    </List>
  );
}

const mapStateToProps = state => {
  return {
    allPromQL: state.metricsReducer.allPromQL,
    customDataArray: state.metricsReducer.customDataArray,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCustomQuery, hyrateCustom }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(CustomQuery);