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
                "font-size": "24px",
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
                "item": {
                    'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
                    'font-weight': 'normal',
                  },
                label: { /* Scale Title */
                    text: "Namespace",
                    'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
                    "font-size": "14px",
  
                },
                labels: this.stateLabel(), /* Scale Labels */
            },
            'scale-y': {
                "item": {
                    'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
                    'font-weight': 'normal',
                  },
                label: { /* Scale Title */
                    text: "Number of Pods",
                    'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
                    "font-size": "14px",
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
                'background-color': this.props.theme.palette.type === 'dark' ? "#BBE6F6 #F7B9DD": "#D4D4FF #F8CDE8", /* Bar fill color (gradient) */
                "borderRadiusTopLeft": 7,
                alpha: this.props.theme.palette.type === 'dark' ? 1: 1, /* Transparency (more transparent) */
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
