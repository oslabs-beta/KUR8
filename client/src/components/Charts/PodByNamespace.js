//sum by (namespace) (kube_pod_info)

import React, { Component } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

//http://localhost:9090/api/v1/query?query=sum%20by%20(namespace)%20(kube_pod_info)&time=2021-07-28T01:53:02.662Z

export class PodByNamespace extends Component {
    constructor(props) {
      super(props);
      this.state = {
        config: {
            type: 'bar',
            "title": {
                "text": "Number of Pods Per Namespace",
                "font-color": "black",
                "backgroundColor": "none",
                "font-size": "22px",
                "alpha": 1,
                "adjust-layout": true,
            },
            "plot": {
              'border-radius': "9px", /* Rounded Corners */
            },
            "plotarea": {
                "margin": "dynamic"
            },
            'scale-x': {
                label: { /* Scale Title */
                    text: "Namespace",
                },
                labels: this.stateLabel(), /* Scale Labels */
            },
            'scale-y': {
                label: { /* Scale Title */
                    text: "Number of Pods",
                },
            },
            "plot": {
                "bars-space-left": 0.15,
                "bars-space-right": 0.15,
                "animation": {
                  "effect": "ANIMATION_SLIDE_BOTTOM",
                  "sequence": 0,
                  "speed": 800,
                  "delay": 800
                }
              },
              "crosshair-x": {
                "line-width": "100%",
                "alpha": 0.18,
                // "plot-label": {
                // //   "header-text": "%kv Pod"
                // }
              },
            series: [{
                values: this.seriesFormat(),
                'background-color': "#6666FF #FF0066", /* Bar fill color (gradient) */
                "borderRadiusTopLeft": 7,
                alpha: 0.3, /* Transparency (more transparent) */
              },
              
            ]
        }
      }
      this.chartDone = this.chartDone.bind(this);
    }

    seriesFormat = () => {
        //[[kubesystem, 9], ...]
        let valueArr = [];

        for (let i = 0; i < this.props.podPerNamespace.length; i++) {
            valueArr.push(Number(this.props.podPerNamespace[i][1]));
        }
        return valueArr;
    }

    stateLabel = () => {
        let labelArr = [];
        for (let i = 0; i < this.props.podPerNamespace.length; i++) {
            labelArr.push(this.props.podPerNamespace[i][0]);
        }
        return labelArr;

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
        podPerNamespace: state.metricsReducer.podPerNamespace,
    }),
    null
    )(PodByNamespace);