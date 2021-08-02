import React, { Component } from 'react';
import { connect } from 'react-redux';
// import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
// import 'zingchart/modules-es6/zingchart-maps.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryCpuRangeChart extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.cpuRangeChart',this.props.cpuRangeChart)
    this.dataFormat();
    this.state = {
      config: {
        "globals": {
          "font-family": "Roboto"
        },
        "graphset": [{
          "type": "line",
          // "utc": true,
          "title": {
            "y": "15px",
            "text": "CPU Query Range Chart",
            "background-color": "none",
            "font-color": "#05636c",
            "font-size": "24px",
            "height": "25px",
            "adjust-layout": true
          },
          "plotarea": {
            "margin-top": "10%",
            "margin-right": "dynamic",
            "margin-bottom": "dynamic",
            "margin-left": "dynamic",
            "adjust-layout": true
          },
          "labels": this.labelFormat(),
          "scale-x": {
            "label": {
              "text": "Time Range",
              "font-size": "14px",
              "font-weight": "normal",
              "offset-x": "10%",
              "font-angle": 360,
            },
            "item": {
              "text-align": "center",
              "font-color": "#05636c"
            },
            "zooming": 1,
            labels: [1627751524.279, 1627755124.279, 1627758724.279, 1627762324.279],
            "items-overlap": true,
            "guide": {
              "line-width": "0px"
            },
            "tick": {
              "line-width": "2px"
            },
          },
          "crosshair-x": {
            "line-color": "#fff",
            "line-width": 1,
            "plot-label": {
              "visible": false
            }
          },
          "scale-y": {
            "item": {
              "font-color": "#05636c",
              "font-weight": "normal"
            },
            "label": {
              "text": "CPU Range Data",
              "font-size": "14px"
            },
            "guide": {
              "line-width": "0px",
              "alpha": 0.2,
              "line-style": "dashed"
            }
          },
          "plot": {
            "line-width": 2,
            "marker": {
              "visible": false,
            },
            "tooltip": {
              "font-family": "Roboto",
              "font-size": "15px",
              "text": `%t value is %v`,
              "text-align": "left",
              "border-radius": 5,
              "padding": 10
            }
          },
          "series": this.dataFormat()
        }]
      }
    };
  }


  dataFormat = () => {
    let outerContainer = [];
    let dataLength = this.props.cpuRangeChart.length;
    let valueObj = {};
    let values = [];
    let timeValue;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.cpuRangeChart[i][1];

      for (let j = 0; j < timeValue.length; j++) {
        values.push(Number(timeValue[j][1]));
      }

      valueObj = {
        "values": values,
        "line-color": lineColor[i % lineColor.length],
        "aspect": "spline",
        "background-color": lineColor[i % lineColor.length],
        "alpha-area": ".5",
        "font-family": "Roboto",
        "font-size": "14px",
        "text": `${this.props.cpuRangeChart[i][0]}`
      },

      outerContainer.push(valueObj);
      valueObj = {};
      values = [];
    }
    console.log('refactor', outerContainer);
    return outerContainer;
  }

  labelFormat = () => {
    const labelContainer = [];
    let labelObj = {};
    let dataLength = this.props.cpuRangeChart.length;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    // const gap = Math.floor(100 / dataLength);
    let start = 5;
    let secondStart = 15;

    for (let i = 0; i < dataLength; i++) {

      if (i <= 4) {
        labelObj = {
          "text": `${this.props.cpuRangeChart[i][0]}: %plot-${i}-value`,
          "default-value": "",
          "color": lineColor[i % lineColor.length],
          "x": `${start}%`,
          "y": 50,
          "width": 120,
          "text-align": "left",
          "bold": 0,
          "font-size": "14px",
          "font-weight": "bold",
        }
        start = start + 20;
      } else {

          labelObj = {
            "text": `${this.props.cpuRangeChart[i][0]}: %plot-${i}-value`,
            "default-value": "",
            "color": lineColor[i % lineColor.length],
            "x": `${secondStart}%`,
            "y": 65,
            "width": 120,
            "text-align": "left",
            "bold": 0,
            "font-size": "14px",
            "font-weight": "bold",
          }
          secondStart = secondStart + 20;
        }
        labelContainer.push(labelObj);
      }
      return labelContainer;
  }

  findMax = () => {
    let data = this.props.cpuRangeChart;
    let maximumVal = -Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] > maximumVal) {
          maximumVal = dataVal[j][0];
        }

      }
      
    }
    return maximumVal * 1000;
  }

  findMin = () => {
    let data = this.props.cpuRangeChart;
    let minimumVal = Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] < minimumVal) {
          minimumVal = dataVal[j][0];
        }

      }
      
    }
    return minimumVal * 1000;
  }

  xAxis = () => {
    let axisLabel = [];

  }

  render() {
    return (
      <div>
        <ZingChart id="querycpurangechart" data={this.state.config} />
      </div>
    );
  }
}









































// class QueryCpuRangeChart extends Component {
//   constructor(props) {
//     super(props);
//     console.log('this.props.cpuRangeChart',this.props.cpuRangeChart)
//     this.state = {
//       config: {
//         "globals": {
//           "font-family": "Roboto"
//         },
//         "graphset": [{
//           "type": "area",
//           "background-color": "#fff",
//           "utc": true,
//           "title": {
//             "y": "15px",
//             "text": "Website Traffic Metrics",
//             "background-color": "none",
//             "font-color": "#05636c",
//             "font-size": "24px",
//             "height": "25px",
//             "adjust-layout": true
//           },
//           "plotarea": {
//             "margin-top": "10%",
//             "margin-right": "dynamic",
//             "margin-bottom": "dynamic",
//             "margin-left": "dynamic",
//             "adjust-layout": true
//           },
//           "labels": [{
//               "text": "Visitors: %plot-2-value",
//               "default-value": "",
//               "color": "#8da0cb",
//               "x": "20%",
//               "y": 50,
//               "width": 120,
//               "text-align": "left",
//               "bold": 0,
//               "font-size": "14px",
//               "font-weight": "bold"
//             },
//             {
//               "text": "Clicks: %plot-1-value",
//               "default-value": "",
//               "color": "#66c2a5",
//               "x": "45%",
//               "y": 70,
//               "width": 120,
//               "text-align": "left",
//               "bold": 0,
//               "font-size": "14px",
//               "font-weight": "bold"
//             },
//             {
//               "text": "Returns: %plot-0-value",
//               "default-value": "",
//               "color": "#fc8d62",
//               "x": "70%",
//               "y": 90,
//               "width": 120,
//               "text-align": "left",
//               "bold": 0,
//               "font-size": "14px",
//               "font-weight": "bold"
//             }
//           ],
//           "scale-x": {
//             "label": {
//               "text": "Date Range",
//               "font-size": "14px",
//               "font-weight": "normal",
//               "offset-x": "10%",
//               "font-angle": 360
//             },
//             "item": {
//               "text-align": "center",
//               "font-color": "#05636c"
//             },
//             "zooming": 1,
//             "max-labels": 12,
//             // "labels": [
//             //   `${new Date(1635243543633)}`,
//             //   "Sept<br>20",
//             //   "Sept<br>21",
//             //   "Sept<br>22",
//             //   "Sept<br>23",
//             //   "Sept<br>24",
//             //   "Sept<br>25",
//             //   "Sept<br>26",
//             //   "Sept<br>27",
//             //   "Sept<br>28",
//             //   "Sept<br>29",
//             //   "Sept<br>30"
//             // ],
//             "max-items": 12,
//             "items-overlap": true,
//             "guide": {
//               "line-width": "0px"
//             },
//             "tick": {
//               "line-width": "2px"
//             },
//           },
//           "crosshair-x": {
//             "line-color": "#fff",
//             "line-width": 1,
//             "plot-label": {
//               "visible": false
//             }
//           },
//           "scale-y": {
//             "values": "0:2500:500",
//             "item": {
//               "font-color": "#05636c",
//               "font-weight": "normal"
//             },
//             "label": {
//               "text": "Metrics",
//               "font-size": "14px"
//             },
//             "guide": {
//               "line-width": "0px",
//               "alpha": 0.2,
//               "line-style": "dashed"
//             }
//           },
//           "plot": {
//             "line-width": 2,
//             "marker": {
//               "size": 1,
//               "visible": false
//             },
//             "tooltip": {
//               "font-family": "Roboto",
//               "font-size": "15px",
//               "text": "There were %v %t on %data-days",
//               "text-align": "left",
//               "border-radius": 5,
//               "padding": 10
//             }
//           },
//           "series": [{
//               "values": [
//                 1204,
//                 1179,
//                 1146,
//                 1182,
//                 1058,
//                 1086,
//                 1141,
//                 1105,
//                 1202,
//                 992,
//                 373,
//                 466
//               ],
//               "data-days": [
//                 `${new Date(1684379439347)}`,
//                 "Sept 20",
//                 "Sept 21",
//                 "Sept 22",
//                 "Sept 23",
//                 "Sept 24",
//                 "Sept 25",
//                 "Sept 26",
//                 "Sept 27",
//                 "Sept 28",
//                 "Sept 29",
//                 "Sept 30"
//               ],
//               "line-color": "#fc8d62",
//               "aspect": "spline",
//               "background-color": "#fc8d62",
//               "alpha-area": ".5",
//               "font-family": "Roboto",
//               "font-size": "14px",
//               "text": "returns"
//             },
//             {
//               "values": [
//                 1625,
//                 1683,
//                 1659,
//                 1761,
//                 1904,
//                 1819,
//                 1631,
//                 1592,
//                 1498,
//                 1594,
//                 1782,
//                 1644
//               ],
//               "data-days": [
//                 `${new Date(1684379439347)}`,
//                 "Sept 20",
//                 "Sept 21",
//                 "Sept 22",
//                 "Sept 23",
//                 "Sept 24",
//                 "Sept 25",
//                 "Sept 26",
//                 "Sept 27",
//                 "Sept 28",
//                 "Sept 29",
//                 "Sept 30"
//               ],
//               "line-color": "#66c2a5",
//               "background-color": "#66c2a5",
//               "alpha-area": ".3",
//               "text": "clicks",
//               "aspect": "spline",
//               "font-family": "Roboto",
//               "font-size": "14px"
//             },
//             {
//               "values": [
//                 314,
//                 1395,
//                 1292,
//                 1259,
//                 1269,
//                 1132,
//                 1012,
//                 1082,
//                 1116,
//                 1039,
//                 1132,
//                 1227
//               ],
//               "data-days": [
//                 `${new Date(1684379439347)}`,
//                 "Sept 20",
//                 "Sept 21",
//                 "Sept 22",
//                 "Sept 23",
//                 "Sept 24",
//                 "Sept 25",
//                 "Sept 26",
//                 "Sept 27",
//                 "Sept 28",
//                 "Sept 29",
//                 "Sept 30"
//               ],
//               "line-color": "#8da0cb",
//               "background-color": "#8da0cb",
//               "aspect": "spline",
//               "alpha-area": "0.2",
//               "text": "visitors",
//               "font-family": "Roboto",
//               "font-size": "14px"
//             }
//           ]
//         }]
//       }
//     }
//   }



//   render() {
//     return (
//       <div>
//         <ZingChart id="querycpurangechart" data={this.state.config} />
//       </div>
//     );
//   }
// }


export default connect(
  state => ({
    cpuRangeChart: state.metricsReducer.cpuRangeChart,
  }),
  null
)(QueryCpuRangeChart);
