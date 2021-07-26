import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

export class CPUContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        config: {
            type: "line",
            "utc": true,
            "title": {
              "text": "Top 4 Container by CPU Usage",
              "font-size": "24px",
              "adjust-layout": true
            },
            "plotarea": {
              "margin": "dynamic 45 60 dynamic",
            },
            "legend": {
              "layout": "float",
              "background-color": "none",
              "border-width": 0,
              "shadow": 0,
              "align": "center",
              "adjust-layout": true,
              "toggle-action": "remove",
              "item": {
                "padding": 7,
                "marginRight": 17,
                "cursor": "hand"
              }
            },
            "scale-x": {
              "min-value" : Date.now() - 86400000,
              "shadow": 0,
              "step": 14400000,
              "transform": {
                "type": "date",
                "all": "%D, %d %M<br />%h:%i %A",
                "guide": {
                  "visible": false
                },
                "item": {
                  "visible": false
                }
              },
              "label": {
                "visible": false
              },
              "minor-ticks": 0
            },
            "scale-y": {
              "line-color": "#f6f7f8",
              "shadow": 0,
              "guide": {
                "line-style": "dashed"
              },
              "label": {
                "text": "Page Views",
              },
              "minor-ticks": 0,
              "thousands-separator": ","
            },
            "crosshair-x": {
              "line-color": "#efefef",
              "plot-label": {
                "border-radius": "5px",
                "border-width": "1px",
                "border-color": "#f6f7f8",
                "padding": "10px",
                "font-weight": "bold"
              },
              "scale-label": {
                "font-color": "#000",
                "background-color": "#f6f7f8",
                "border-radius": "5px"
              }
            },
            "tooltip": {
              "visible": false
            },
            "plot": {
              "highlight": true,
              "tooltip-text": "%t views: %v<br>%k",
              "shadow": 0,
              "line-width": "2px",
              "marker": {
                "type": "circle",
                "size": 3
              },
              "highlight-state": {
                "line-width": 3
              },
              "animation": {
                "effect": 1,
                "sequence": 2,
                "speed": 100,
              }
            },
            "series": this.stateFormat()
      },
    };

    this.chartDone = this.chartDone.bind(this);
  }

//   getTimeFormat = (num) => {
//       //get it in miliseconds first;
//       num = num * 1000;
//       let graphDate = new Date(num);
//       let newFormat;
//       let newHour;
//       let newMinute;
//       let newSecond;

//         //getting new data to put on x-axis;
//       if (String(graphDate.getHours()).length === 1) {
//           newHour = `0${graphDate.getHours()}`;
//       } 
//       if (String(graphDate.getHours()).length !== 1) {
//         newHour = graphDate.getHours();
//       } 
//       if (String(graphDate.getMinutes()).length === 1) {
//         newMinute = `0${graphDate.getMinutes()}`;
//       } 
//       if (String(graphDate.getMinutes()).length === 1) {
//         newMinute = `0${graphDate.getMinutes()}`;
//       } 
//       if (String(graphDate.getSeconds()).length === 1) {
//         newSecond = `0${graphDate.getSeconds()}`;
//       } 
//       if (String(graphDate.getSeconds()).length === 1) {
//         newSecond = `0${graphDate.getSeconds()}`;
//       };

//       let newFormat = `${newHour}:${newMinute}:${newSecond}`;
//       return newFormat;
//   }

  stateFormat = () => {
      let pathLength = this.props.cpuContainerData.length;

      let outerContainer = [];
      let eachData = [];
      let seriesObj;
      let value;

      let lineColor = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#9ED2F6", "#9DDCE0", "#ADD4FF"];
      for (let i = 0; i < pathLength; i++) {
          value = this.props.cpuContainerData[i][2];

          for (let j = 0; j < value.length; j++) {
              eachData.push(j[1]);
          }

          seriesObj = {
            "values": eachData,
            "text": `${this.props.cpuContainerData[i][0]}`,
            "line-color": lineColor[i % lineColor.length],
            "legend-item": {
              "background-color": lineColor[i % lineColor.length],
              "borderRadius": 5,
              "font-color": "white"
            },
            "legend-marker": {
              "visible": false
            },
            "marker": {
              "background-color": lineColor[i % lineColor.length],
              "border-width": 1,
              "shadow": 0,
              "border-color": "#69dbf1"
            },
            "highlight-marker": {
              "size": 6,
              "background-color": lineColor[i % lineColor.length],
            },
          }
          outerContainer.push(seriesObj);
      } 
      return outerContainer;     
  }

  render() {
    return (
    <div>
        <ZingChart data={this.state.config} complete={this.chartDone} />
    </div>
    );
  }
  chartDone(event) {
    console.log(`Event "Complete" - The chart is rendered\n`);
  }
}

export default connect(
  state => ({
    cpuContainerData: state.metricsReducer.cpuContainerData,
  }),
  null
)(CPUContainer);