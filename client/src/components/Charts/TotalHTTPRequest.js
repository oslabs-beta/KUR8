import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

export class TotalHTTPRequest extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.cpuGauge',this.props.cpuGauge)
    this.state = {
        config: {
            type: "line",
            "utc": true,
            "title": {
              "text": "Total Kubelet Http Request",
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
              "min-value": 1383292800000,
              "shadow": 0,
              "step": 3600000,
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
            "series": [{
                "values": [
                  149.2,
                  174.3,
                  187.7,
                  147.1,
                  129.6,
                  189.6,
                  230,
                  164.5,
                  171.7,
                  163.4,
                  194.5,
                  200.1,
                  193.4,
                  254.4,
                  287.8,
                  246,
                  199.9,
                  218.3,
                  244,
                  312.2,
                  284.5,
                  249.2,
                  305.2,
                  286.1,
                  347.7,
                  278,
                  240.3,
                  212.4,
                  237.1,
                  253.2,
                  186.1,
                  153.6,
                  168.5,
                  140.9,
                  86.9,
                  49.4,
                  24.7,
                  64.8,
                  114.4,
                  137.4
                ],
                "text": "Pricing",
                "line-color": "#007790",
                "legend-item": {
                  "background-color": "#007790",
                  "borderRadius": 5,
                  "font-color": "white"
                },
                "legend-marker": {
                  "visible": false
                },
                "marker": {
                  "background-color": "#007790",
                  "border-width": 1,
                  "shadow": 0,
                  "border-color": "#69dbf1"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#007790",
                }
              },
              {
                "values": [
                  714.6,
                  656.3,
                  660.6,
                  729.8,
                  731.6,
                  682.3,
                  654.6,
                  673.5,
                  700.6,
                  755.2,
                  817.8,
                  809.1,
                  815.2,
                  836.6,
                  897.3,
                  896.9,
                  866.5,
                  835.8,
                  797.9,
                  784.7,
                  802.8,
                  749.3,
                  722.1,
                  688.1,
                  730.4,
                  661.5,
                  609.7,
                  630.2,
                  633,
                  604.2,
                  558.1,
                  581.4,
                  511.5,
                  556.5,
                  542.1,
                  599.7,
                  664.8,
                  725.3,
                  694.2,
                  690.5
                ],
                "text": "Documentation",
                "line-color": "#009872",
                "legend-item": {
                  "background-color": "#009872",
                  "borderRadius": 5,
                  "font-color": "white"
                },
                "legend-marker": {
                  "visible": false
                },
                "marker": {
                  "background-color": "#009872",
                  "border-width": 1,
                  "shadow": 0,
                  "border-color": "#69f2d0"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#009872",
                }
              },
              {
                "values": [
                  536.9,
                  576.4,
                  639.3,
                  669.4,
                  708.7,
                  691.5,
                  681.7,
                  673,
                  701.8,
                  636.4,
                  637.8,
                  640.5,
                  653.1,
                  613.7,
                  583.4,
                  538,
                  506.7,
                  563.1,
                  541.4,
                  489.3,
                  434.7,
                  442.1,
                  482.3,
                  495.4,
                  556.1,
                  505.4,
                  463.8,
                  434.7,
                  377.4,
                  325.4,
                  351.7,
                  343.5,
                  333.2,
                  332,
                  378.9,
                  415.4,
                  385,
                  412.6,
                  445.9,
                  441.5
                ],
                "text": "Support",
                "line-color": "#da534d",
                "legend-item": {
                  "background-color": "#da534d",
                  "borderRadius": 5,
                  "font-color": "white"
                },
                "legend-marker": {
                  "visible": false
                },
                "marker": {
                  "background-color": "#da534d",
                  "border-width": 1,
                  "shadow": 0,
                  "border-color": "#faa39f"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#da534d",
                }
              }
            ]
      },
    };

    this.chartDone = this.chartDone.bind(this);
    // console.log('this.props.cpuGauge', this.props.cpuGauge); 

  }

  getTimeFormat = (num) => {
      //get it in miliseconds first;
      num = num * 1000;
      let graphDate = new Date(num);
      let newFormat;
      let newHour;
      let newMinute;
      let newSecond;

        //getting new data to put on x-axis;
      if (String(graphDate.getHours()).length === 1) {
          newHour = `0${graphDate.getHours()}`;
      } 
      if (String(graphDate.getHours()).length !== 1) {
        newHour = graphDate.getHours();
      } 
      if (String(graphDate.getMinutes()).length === 1) {
        newMinute = `0${graphDate.getMinutes()}`;
      } 
      if (String(graphDate.getMinutes()).length === 1) {
        newMinute = `0${graphDate.getMinutes()}`;
      } 
      if (String(graphDate.getSeconds()).length === 1) {
        newSecond = `0${graphDate.getSeconds()}`;
      } 
      if (String(graphDate.getSeconds()).length === 1) {
        newSecond = `0${graphDate.getSeconds()}`;
      };

      let newFormat = `${newHour}:${newMinute}:${newSecond}`;
      return newFormat;

  }

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {

    return (
      <div>
          <div>
            <select value={event.target.value} onChange={e => this.updateGauge(e.target.value)}>
            <option disabled>Select Node</option>
            {this.props.cpuGauge.map((node, index) => {
              return <option key={`note-options-${index}`} value={node[1]}>{node[1]}</option>;
            })}
          </select>
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

export default connect(
  state => ({
    httpRequestData: state.metricsReducer.httpRequestData,
  }),
  null
)(TotalHTTPRequest);

