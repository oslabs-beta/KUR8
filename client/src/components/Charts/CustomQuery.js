import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {
  fetchCustomQuery,
  hyrateCustom,
} from '../../actions/metricsActionCreators';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  customQueryRoot: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%',
    height: '200px',
  },
  addChartText: {
    marginLeft: theme.spacing(2),
  },
  icon: {
    color: theme.palette.grey[700],
  },
  mainSearchInput: {
    width: '100%',
    '& > .Mui-focused': {
      borderColor: 'red',
    },
  },
  timeRange: {
    marginRight: theme.spacing(2),
  },
  input: {
    height: '50px',
  },
  submitButton: {
    height: '50px',
    width: '100Px',
    '&:hover': {
      color: theme.palette.common.white,
      background:
        theme.palette.type === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[700],
    },
  },
}));

function CustomQuery({
  fetchCustomQuery,
  allPromQL,
  customDataArray,
  hyrateCustom,
}) {
  //on page load this useEffect will check to see if any custom charts have been stored in local storage and dispatch them to hydrate the store via the reducer
  useEffect(() => {
    const retrieveStash = localStorage.getItem('customcharts');
    if (retrieveStash) {
      hyrateCustom(JSON.parse(retrieveStash));
    }
  }, []);

  //This useEffect comes after the hydrate to not overwrite the previous localstorage before hydrating when adding new charts
  useEffect(() => {
    localStorage.setItem('customcharts', JSON.stringify(customDataArray));
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false); //state of collapsable Custom Query Form, true = expanded, false = collpased
  const [query, setQuery] = useState(''); //current query inputted
  const [range, setRange] = useState('Range'); //current data time range selected
  const [step, setStep] = useState('Step'); //current step interval selected

  const handleNesting = () => {
    setOpen(!open);
  };

  //only updates query state on select or enter press for some reason
  const handleQueryChange = (event, selectedObject) => {
    setQuery(selectedObject);
  };

  const handleRangeChange = event => {
    setRange(event.target.value);
  };

  const handleStepChange = event => {
    setStep(event.target.value);
  };

  //queries Prometheus with query: string, range: number, step: number
  const handleSubmit = event => {
    event.preventDefault();
    fetchCustomQuery(query, range, step);
  };

  //default values for data time ranges in select drop down menu
  const ranges = [1, 2, 3, 4, 8, 12, 18, 24];
  //default values for data step intervals in select drop down menu
  const steps = [15, 30, 60, 120];

  return (
    <Paper className={classes.customQueryRoot}>
      <Grid
        className={classes.addChartContainer}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center">
        <InboxIcon className={classes.icon} />
        <Typography
          className={classes.addChartText}
          variant="h6"
          component="h1">
          Add New Chart
        </Typography>
      </Grid>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Autocomplete
          id="autocomplete-query"
          freeSolo
          className={classes.mainSearchInput}
          value={query}
          onChange={handleQueryChange}
          options={allPromQL.map(option => option)}
          renderOption={option => option}
          renderInput={params => (
            <TextField
              {...params}
              label="Enter Prometheus Query"
              margin="normal"
              variant="outlined"
            />
          )}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Select
              id="select-range"
              value={range}
              onChange={handleRangeChange}
              label="Choose a time range"
              variant="outlined"
              className={classes.timeRange}>
              <MenuItem value="Range">
                <em>Select a time range</em>
              </MenuItem>
              {ranges.map(ranges => (
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
              variant="outlined">
              <MenuItem value="Step">
                <em>Select a step interval</em>
              </MenuItem>
              {steps.map(steps => (
                <MenuItem key={steps} value={steps}>
                  {`${steps} seconds`}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item>
            <Button
              id="submit-custom"
              type="submit"
              variant="outlined"
              className={classes.submitButton}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
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
