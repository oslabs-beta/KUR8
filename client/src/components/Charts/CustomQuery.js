import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function CustomQuery() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [range, setRange] = useState(12);
  const [step, setStep] = useState(30);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleNesting = () => {
    setOpen(!open);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log( 'query:', query, 'range: ', range, 'step', step); 
  }

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleStepChange = (event) => {
    setStep(event.target.value);
  };

  const ranges = [1,2,3,4,8,12,18,24];
  const steps = [15,30,60,120];

  return (
    <List>
      <ListItem button onClick={handleNesting}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Query" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem button className={classes.nested}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-multiline-flexible"
              label="Enter Prometheus Query"
              multiline
              // maxRows={8}
              value={query}
              onChange={handleQueryChange}
              variant="outlined"
            />
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={range}
              onChange={handleRangeChange}
              label="Choose a time range"
            >
              <MenuItem value="">
              </MenuItem>
              {ranges.map((ranges) => (
                <MenuItem key={ranges} value={ranges}>
                  {`${ranges} hours`}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={step}
              onChange={handleStepChange}
              label="Choose a step interval"
            >
              <MenuItem value="">
              </MenuItem>
              {steps.map((steps) => (
                <MenuItem key={steps} value={steps}>
                  {`${steps} seconds`}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              // className={classes.button}
            >
              Submit
            </Button>
          </form>
        </ListItem>
      </Collapse>
    </List>
  );
}