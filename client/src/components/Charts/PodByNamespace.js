import React, { Component } from 'react';
import ZingChart from 'zingchart-react';
import { withTheme } from '@material-ui/core/styles';

export class PodByNamespace extends Component {
    constructor(props) {
      super(props);

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
        let myConfig = {
            type: 'bar',
            "title": {
                "text": "Number of Pods Per Namespace",
                "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
                "backgroundColor": "none",
                "font-size": "22px",
                "alpha": 1,
                "adjust-layout": true,
            },
            "globals": {
                "font-family": "Roboto",
                "background-color": this.props.theme.palette.type === 'dark' ? '#424242': 'white',
              },
            "plot": {
              'border-radius': "9px", /* Rounded Corners */
              'width':'100%',
              
            },
            "plotarea": {
                "margin": "dynamic",
                'width':'100%',
            },
            'scale-x': {
                "font-color": this.props.theme.palette.type === 'dark' ? "white" : "#424242",
                label: { /* Scale Title */
                    text: "Namespace",
                },
                labels: this.stateLabel(), /* Scale Labels */
            },
            'scale-y': {
                "font-color": this.props.theme.palette.type === 'dark' ? "white" : "#424242",
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
                  "speed": 1500,
                  "delay": 200
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
                'background-color': this.props.theme.palette.type === 'dark' ? "blue pink": "#6666FF #FF0066", /* Bar fill color (gradient) */
                "borderRadiusTopLeft": 7,
                alpha: this.props.theme.palette.type === 'dark' ? 0.8: 0.6, /* Transparency (more transparent) */
              },
              
            ]
        }

        return (
        <div>
            <ZingChart data={myConfig} complete={this.chartDone} />
        </div>
        );
    }
    chartDone(event) {
        console.log(`Event "Complete" - The chart is rendered\n`);
    }
}

export default withTheme(PodByNamespace);
