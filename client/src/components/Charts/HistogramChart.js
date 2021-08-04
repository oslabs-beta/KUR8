import React, { Component } from 'react';
import ZingChart from 'zingchart-react';
import { withTheme } from '@material-ui/core/styles';

class HistogramChart extends Component {
  constructor(props) {
    super(props);
    console.log("this.props.defaultcharts[0].help", this.props.defaultcharts[0].help)
  }

  render() {
    let myConfig = {
      type: 'bar',
      "globals": {
        "font-family": "Roboto",
        "background-color": this.props.theme.palette.type === 'dark' ? '#424242': 'white',
      },
      title: {
        'text': 'Garbage Collection Duration by Kind',
        "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
        "backgroundColor": "none",
        "font-size": "22px",
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
        "font-color": this.props.theme.palette.type === 'dark' ? "white" : "#424242",
        label: {
          text: "Kind"
        },
        "values": this.props.defaultcharts[0].labelsArray,  
      },
      "scale-y":{  
        "font-color": this.props.theme.palette.type === 'dark' ? "white" : "#424242",
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
        // "plot-label": {
        // //   "header-text": "%kv Pod"
        // }
      },
      series: [{
        values: this.props.defaultcharts[0].valueArray,
        'background-color': this.props.theme.palette.type === 'dark'? "blue purple": "red yellow", /* Bar fill color (gradient) */
        "borderRadiusTopLeft": 7,
        alpha: this.props.theme.palette.type === 'dark'? 0.8: 0.6, /* Transparency (more transparent) */
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




