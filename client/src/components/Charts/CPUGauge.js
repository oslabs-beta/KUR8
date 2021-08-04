import { useState } from 'react';
import ZingChart from 'zingchart-react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import { withTheme } from '@material-ui/core/styles';

// EXPLICITLY IMPORT MODULE from node_modules
// import 'zingchart/modules-es6/zingchart-maps.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa.min.js';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    display: 'flex',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export function CPUGauge(props) {

  const [node, setNode] = useState(props.cpuGauge[0][2]);

  console.log('frefrfrfrfrfr', props.cpuGauge[0][2])
  const { classes } = props;

  const myConfig = {
    type: 'gauge',
    "globals": {
      "font-family": "Roboto",
      'background-color': props.theme.palette.type === 'dark' ? "#424242" : "white",
      'color': props.theme.palette.type === 'dark' ? "white" : "#424242",
    },
    title: {
      text: 'CPU usage in %',
      "font-size": "24px",
    },
    scale: {
      'size-factor': 0.9,

    },
    series: [
      {
        values: [Number(node)],
        "csize": "10%", //Needle Indicator Width
        "size": "70%", //Needle Indicator Length
        "background-color": "#66CCFF #FFCCFF"
      },
    ],
    'scale-r': {
      aperture: 270,     //Specify your scale range.
      values: "0:100:20", //Provide min/max/step scale values.
      center: {  //Pivot Point
        type: "gear9",   //Specify your marker shape.
        size: 15,
      },
      ring: {  //Gauge Ring
        size: 10,
        rules: [
          {
            rule: "%v >= 0 && %v <= 20",
            'background-color': "#9EC1CF"
          },
          {
            rule: "%v >= 20 && %v <= 40",
            'background-color': "#9EE09E"
          },
          {
            rule: "%v >= 40 && %v <= 60",
            'background-color': "#FDFD97"
          },
          {
            rule: "%v >= 60 && %v <= 80",
            'background-color': "#FEB144"
          },
          {
            rule: "%v >= 80 && %v <= 100",
            'background-color': "#FF6663"
          },
        ]
      }
    }
  }


  const updateGauge = (nodeID) => {
    let nodeData;
    props.cpuGauge.forEach(node => {
      if (node[1] === nodeID) nodeData = node[2]
    })
    setNode(nodeData);


  }

  return (
    <div>
      <div>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Select Node</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={event.target.value}
            defaultValue=""
            onChange={e => updateGauge(e.target.value)}
            label="Select Node"
          >
            {props.cpuGauge.map((node, index) => {
              return (
                <MenuItem value={node[1]}>{node[0]}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>

      <div>
        <ZingChart data={myConfig} />
      </div>
    </div>
  )
};

export default withStyles(styles)(withTheme(CPUGauge));
