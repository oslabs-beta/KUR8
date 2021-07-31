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
          // "background-color": "#fff",
          "utc": true,
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
              "text": "Date Range",
              "font-size": "14px",
              "font-weight": "normal",
              "offset-x": "10%",
              "font-angle": 360
            },
            "item": {
              "text-align": "center",
              "font-color": "#05636c"
            },
            "zooming": 1,
            // "labels": [
            //   "Sept<br>19",
            //   "Sept<br>20",
            //   "Sept<br>21",
            //   "Sept<br>22",
            //   "Sept<br>23",
            //   "Sept<br>24",
            //   "Sept<br>25",
            //   "Sept<br>26",
            //   "Sept<br>27",
            //   "Sept<br>28",
            //   "Sept<br>29",
            //   "Sept<br>30"
            // ],
            // "max-items": 12,
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
              "size": 1,
              "visible": false
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
    let dataTime = [];
    let timeValue;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.cpuRangeChart[i][1];

      for (let j = 0; j < timeValue.length; j++) {
        values.push(Number(timeValue[j][1]));
        dataTime.push(Number(timeValue[j][0]))
      }

      valueObj = {
        "values": values,
        "dataTime": dataTime,
        "line-color": lineColor[i % lineColor.length],
        "aspect": "spline",
        "background-color": lineColor[i % lineColor.length],
        "alpha-area": ".5",
        "font-family": "Roboto",
        "font-size": "14px",
        "text": `${this.props.cpuRangeChart[i][0]}`
      }

      outerContainer.push(valueObj);
      valueObj = {};
      values = [];
      dataTime = [];
    }
    console.log('refactor', outerContainer);
    return outerContainer;
  }

  labelFormat = () => {
    const labelContainer = [];
    let labelObj = {};
    let dataLength = this.props.cpuRangeChart.length;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    const gap = Math.floor(100 / dataLength);
    let start = 0;

    for (let i = 0; i < dataLength; i++) {

      labelObj = {
        "text": `${this.props.cpuRangeChart[i][0]}: %plot-${i}-value`,
        "default-value": "",
        "color": lineColor[i % lineColor.length],
        "x": `${start + gap}%`,
        "y": 50,
        "width": 140,
        "text-align": "left",
        "bold": 0,
        "font-size": "12px",
        "font-weight": "bold",
        "layout": "float",
        "adjust-layout": true,
      }

      start = start + gap;
      labelContainer.push(labelObj);
    }
    return labelContainer;
  }

  findMax = () => {
    let data = this.props.cpuContainer;
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
    let data = this.props.cpuContainer;
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



  render() {
    return (
      <div>
        <ZingChart id="querycpurangechart" data={this.state.config} />
      </div>
    );
  }
}


export default connect(
  state => ({
    cpuRangeChart: state.metricsReducer.cpuRangeChart,
  }),
  null
)(QueryCpuRangeChart);
