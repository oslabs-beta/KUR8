import React, { Component } from 'react';
import ZingChart from 'zingchart-react';
import { withTheme } from '@material-ui/core/styles';

class HistogramChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //config files from zingchart
    let myConfig = {
      type: 'bar',
      "globals": {
        "font-family": "Roboto",
          //rendering zingchart with config, change in theme depending on the current theme type
        "background-color": this.props.theme.palette.type === 'dark' ? '#424242': 'white',
      },
      title: {
        'text': 'Garbage Collection Duration by Kind',
        "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
        "backgroundColor": "none",
        "font-size": "24px",
        "alpha": 1,
        "adjust-layout": true,
      },
      "plot": {
        'border-radius': "9px", /* Rounded Corners */
        'width':'100%',
        'height': '100%'
      },
      "plotarea": {
          "margin": "dynamic",
          'width':'100%',
          'height': '100%'
      },
      "scale-x":{  
        "item": {
          'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
          'font-weight': 'normal',
        },
        label: {
          text: "Kind",
          "font-size": "14px",
          'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
        },
        "values": this.props.defaultcharts[0].labelsArray,  
      },
      "scale-y":{  
        "item": {
          'font-color': this.props.theme.palette.type === 'dark' ? "white": "#424242",
          'font-weight': 'normal',
        },
        label: {
          text: "Time",
          "font-size": "14px"
        },
        format: '%v ms',
        text: "Amount of Garbage"
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
      },
      series: [{
        values: this.props.defaultcharts[0].valueArray,
        'background-color': this.props.theme.palette.type === 'dark'? " #EAB6A7 #EFE8CD": "#B1D9CD #FAD2A7", /* Bar fill color (gradient) */
        "borderRadiusTopLeft": 7,
        alpha: this.props.theme.palette.type === 'dark'? 1: 1, /* Transparency (more transparent) */
      }]
    }

    return (
      <div>
        <ZingChart id='histogramchart' data={myConfig}/>

      </div>
    );
  }
}


export default withTheme(HistogramChart);




