import React, { Component } from 'react';
import { connect } from 'react-redux';
// import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
// import 'zingchart/modules-es6/zingchart-maps.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryRangeChart extends Component {
  constructor(props) {
    super(props);
    this.dataFormat();
    this.state = {
      config: {
        "globals": {
          "font-family": "Roboto"
        },
        "graphset": [{
          "type": "area",
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
              "text": "Query Range Data",
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
    let dataLength = this.props.querycharts.length;
    let valueObj = {};
    let values = [];
    let timeValue;
    let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.querycharts[i][1];

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
        "text": `${this.props.querycharts[i][0]}`
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
    let dataLength = this.props.querycharts.length;
    let lineColor = ["#9DDCE0", "#FF9AA2", "#9ED2F6", "#ADD4FF","#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"];

    // const gap = Math.floor(100 / dataLength);
    let start = 5;
    let secondStart = 15;

    for (let i = 0; i < dataLength; i++) {

      if (i <= 4) {
        labelObj = {
          "text": `${this.props.querycharts[i][0]}: %plot-${i}-value`,
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
            "text": `${this.props.querycharts[i][0]}: %plot-${i}-value`,
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
    let data = this.props.querycharts;
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
    let data = this.props.querycharts;
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
        <ZingChart id="queryrangechart" data={this.state.config} />
      </div>
    );
  }
}


export default connect(
  state => ({
    querycharts: state.metricsReducer.querycharts,
  }),
  null
)(QueryRangeChart);
