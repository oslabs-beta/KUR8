import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import ZingChart from 'zingchart-react';

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

export class CPUGauge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'gauge',
        globals: {
          'font-family': 'Roboto',
        },
        title: {
          text: 'CPU usage in %',
        },
        scale: {
          'size-factor': 0.9,
        },
        series: [
          {
            values: [Number(this.props.cpuGauge[0][2])],
            csize: '10%', //Needle Indicator Width
            size: '70%', //Needle Indicator Length
            'background-color': '#66CCFF #FFCCFF',
          },
        ],
        'scale-r': {
          aperture: 270, //Specify your scale range.
          values: '0:100:20', //Provide min/max/step scale values.
          center: {
            //Pivot Point
            type: 'gear9', //Specify your marker shape.
            size: 15,
          },
          ring: {
            //Gauge Ring
            size: 10,
            rules: [
              {
                rule: '%v >= 0 && %v <= 20',
                'background-color': '#9EC1CF',
              },
              {
                rule: '%v >= 20 && %v <= 40',
                'background-color': '#9EE09E',
              },
              {
                rule: '%v >= 40 && %v <= 60',
                'background-color': '#FDFD97',
              },
              {
                rule: '%v >= 60 && %v <= 80',
                'background-color': '#FEB144',
              },
              {
                rule: '%v >= 80 && %v <= 100',
                'background-color': '#FF6663',
              },
            ],
          },
        },
      },
    };
    this.chartDone = this.chartDone.bind(this);
    // console.log('this.props.cpuGauge', this.props.cpuGauge);
  }

  updateGauge = nodeID => {
    let nodeData;
    this.props.cpuGauge.forEach(node => {
      if (node[1] === nodeID) nodeData = node[2];
    });

    this.setState({
      config: {
        type: 'gauge',
        title: {
          text: 'CPU usage in %',
        },
        scale: {
          'size-factor': 0.9,
        },
        series: [
          {
            values: [Number(nodeData)],
            csize: '10%', //Needle Indicator Width
            size: '70%', //Needle Indicator Length
            'background-color': '#66CCFF #FFCCFF',
          },
        ],
        'scale-r': {
          aperture: 270, //Specify your scale range.
          values: '0:100:20', //Provide min/max/step scale values.
          center: {
            //Pivot Point
            type: 'gear9', //Specify your marker shape.
            size: 15,
          },
          ring: {
            //Gauge Ring
            size: 10,
            rules: [
              {
                rule: '%v >= 0 && %v <= 20',
                'background-color': '#9EC1CF',
              },
              {
                rule: '%v >= 20 && %v <= 40',
                'background-color': '#9EE09E',
              },
              {
                rule: '%v >= 40 && %v <= 60',
                'background-color': '#FDFD97',
              },
              {
                rule: '%v >= 60 && %v <= 80',
                'background-color': '#FEB144',
              },
              {
                rule: '%v >= 80 && %v <= 100',
                'background-color': '#FF6663',
              },
            ],
          },
        },
      },
    });
  };

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          {/* <select value={event.target.value} onChange={e => this.updateGauge(e.target.value)}>
            <option disabled>Select Node</option> */}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Node
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={event.target.value}
              defaultValue=""
              onChange={e => this.updateGauge(e.target.value)}
              label="Select Node">
              {this.props.cpuGauge.map((node, index) => {
                return <MenuItem key={`menu-item-${index}`} value={node[1]}>{node[0]}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {/* {this.props.cpuGauge.map((node, index) => {
              return <option key={`note-options-${index}`} value={node[1]}>{node[0]}</option>;
            })} */}
          {/* </select> */}
        </div>

        <div>
          <ZingChart data={this.state.config} complete={this.chartDone} />
        </div>
      </div>
    );
  }
  chartDone(event) {
    console.log(`Event "Complete" - The chart is rendered\n`);
  }
}

export default withStyles(styles)(withTheme(CPUGauge));
