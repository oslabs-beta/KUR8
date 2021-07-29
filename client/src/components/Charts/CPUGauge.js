import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

export class CPUGauge extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.cpuGauge',this.props.cpuGauge)
    this.state = {
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
            values: [Number(this.props.cpuGauge[0][2])],
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
              size:15,
            },
            ring: {  //Gauge Ring
              size:10,
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
      },
    };
    this.chartDone = this.chartDone.bind(this);
    // console.log('this.props.cpuGauge', this.props.cpuGauge); 

  }

  updateGauge = (nodeID) => {
    let nodeData;
    this.props.cpuGauge.forEach(node => {
      if (node[1] === nodeID) nodeData = node[2]
    })

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
              size:15,
            },
            ring: {  //Gauge Ring
              size:10,
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
      },
    });
  }

  //   [[kind-control-plane, Node 1, 87], [worker-node, Node 2, 109], [worker-node, Node 3, 71]]
  render() {

    return (
      <div>
          <div>
            <select value={event.target.value} onChange={e => this.updateGauge(e.target.value)}>
            <option disabled>Select Node</option>
            {this.props.cpuGauge.map((node, index) => {
              return <option key={`note-options-${index}`} value={node[1]-node[0]}>{node[1]-node[0]}</option>;
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
    cpuGauge: state.metricsReducer.cpuGauge,
  }),
  null
)(CPUGauge);

