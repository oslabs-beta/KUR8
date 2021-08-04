import React, { useState } from 'react';
// import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';

// EXPLICITLY IMPORT MODULE from node_modules
// import 'zingchart/modules-es6/zingchart-maps.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa.min.js';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    display: "flex",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export function CPUGauge(props) {

  const [node, setNode] = useState(props.cpuGauge[0][2]);
  const theme = useTheme();

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


export default withStyles(styles, { withTheme: true })(CPUGauge);


































// export class CPUGauge extends Component {
//   constructor(props) {
//     super(props);
//     console.log('this.props.cpuGauge',this.props.cpuGauge)
//     this.state = {
//       config: {
//         type: 'gauge',
//         "globals": {
//           "font-family": "Roboto"
//         },
//         title: {
//           text: 'CPU usage in %',
//         },
//         scale: {
//           'size-factor': 0.9,
//         },
//         series: [
//           {
//             values: [Number(this.props.cpuGauge[0][2])],
//             "csize": "10%", //Needle Indicator Width
//             "size": "70%", //Needle Indicator Length
//             "background-color": "#66CCFF #FFCCFF"
//           },
//         ],
//           'scale-r': {
//             aperture: 270,     //Specify your scale range.
//             values: "0:100:20", //Provide min/max/step scale values.
//             center: {  //Pivot Point
//               type: "gear9",   //Specify your marker shape.
//               size:15,
//             },
//             ring: {  //Gauge Ring
//               size:10,
//               rules: [
//                 {
//                   rule: "%v >= 0 && %v <= 20",
//                   'background-color': "#9EC1CF"
//                 },
//                 {
//                   rule: "%v >= 20 && %v <= 40",
//                   'background-color': "#9EE09E"
//                 },
//                 {
//                   rule: "%v >= 40 && %v <= 60",
//                   'background-color': "#FDFD97"
//                 },
//                 {
//                   rule: "%v >= 60 && %v <= 80",
//                   'background-color': "#FEB144"
//                 },
//                 {
//                   rule: "%v >= 80 && %v <= 100",
//                   'background-color': "#FF6663"
//                 },
//               ]
//             }
//           }
//       },
//     };
//     this.chartDone = this.chartDone.bind(this);
//     // console.log('this.props.cpuGauge', this.props.cpuGauge); 

//   }

//   updateGauge = (nodeID) => {
//     let nodeData;
//     this.props.cpuGauge.forEach(node => {
//       if (node[1] === nodeID) nodeData = node[2]
//     })

//     this.setState({
//       config: {
//         type: 'gauge',
//         title: {
//           text: 'CPU usage in %',
//         },
//         scale: {
//           'size-factor': 0.9,
//         },
//         series: [
//           {
//             values: [Number(nodeData)],
//             "csize": "10%", //Needle Indicator Width
//             "size": "70%", //Needle Indicator Length
//             "background-color": "#66CCFF #FFCCFF"
//           },
//         ],
//           'scale-r': {
//             aperture: 270,     //Specify your scale range.
//             values: "0:100:20", //Provide min/max/step scale values.
//             center: {  //Pivot Point
//               type: "gear9",   //Specify your marker shape.
//               size:15,
//             },
//             ring: {  //Gauge Ring
//               size:10,
//               rules: [
//                 {
//                   rule: "%v >= 0 && %v <= 20",
//                   'background-color': "#9EC1CF"
//                 },
//                 {
//                   rule: "%v >= 20 && %v <= 40",
//                   'background-color': "#9EE09E"
//                 },
//                 {
//                   rule: "%v >= 40 && %v <= 60",
//                   'background-color': "#FDFD97"
//                 },
//                 {
//                   rule: "%v >= 60 && %v <= 80",
//                   'background-color': "#FEB144"
//                 },
//                 {
//                   rule: "%v >= 80 && %v <= 100",
//                   'background-color': "#FF6663"
//                 },
//               ]
//             }
//           }
//       },
//     });
//   }

//   //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
//   render() {
//     const { classes } = this.props;

//     return (
//       <div>
//           <div>

//               <FormControl variant="outlined" className={classes.formControl}>
//               <InputLabel id="demo-simple-select-outlined-label">Select Node</InputLabel>
//               <Select
//                 labelId="demo-simple-select-outlined-label"
//                 id="demo-simple-select-outlined"
//                 value={event.target.value}
//                 defaultValue=""
//                 onChange={e => this.updateGauge(e.target.value)}
//                 label="Select Node"
//               >
//                 {this.props.cpuGauge.map((node, index) => {
//                 return (
//                 <MenuItem value={node[1]}>{node[0]}</MenuItem>
//                 )})}
//               </Select>
//               </FormControl>
//         </div>

//         <div>
//           <ZingChart data={this.state.config} complete={this.chartDone} />
//         </div>
//       </div>
//     );
//   }
//   chartDone(event) {
//     console.log(`Event "Complete" - The chart is rendered\n`);
//   }
// }



// export default connect(
//   state => ({
//     cpuGauge: state.metricsReducer.cpuGauge,
//   }),
//   null
// )withStyles(CPUGauge);
