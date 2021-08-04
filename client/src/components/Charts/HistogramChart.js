import React, { Component } from 'react';
import ZingChart from 'zingchart-react';

class HistogramChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'bar',
        globals: {
          'font-family': 'Roboto',
        },
        title: {
          text: 'Garbage Collection Duration by Kind',
          'font-color': 'black',
          backgroundColor: 'none',
          'font-size': '22px',
          alpha: 1,
          'adjust-layout': true,
        },
        plot: {
          'border-radius': '9px' /* Rounded Corners */,
          width: '100%',
          height: '100%',
        },
        plotarea: {
          margin: 'dynamic',
          width: '100%',
          height: '100%',
        },
        'scale-x': {
          label: {
            text: 'Kind',
          },
          values: this.props.defaultcharts[0].labelsArray,
        },
        'scale-y': {
          format: '%v ms',
          text: 'Amount of Garbage',
        },
        plot: {
          'bars-space-left': 0.15,
          'bars-space-right': 0.15,
          animation: {
            effect: 'ANIMATION_SLIDE_BOTTOM',
            sequence: 0,
            speed: 800,
            delay: 800,
          },
        },
        'crosshair-x': {
          'line-width': '100%',
          alpha: 0.18,
        },
        series: [
          {
            values: this.props.defaultcharts[0].valueArray,
            'background-color': 'green blue' /* Bar fill color (gradient) */,
            borderRadiusTopLeft: 7,
            alpha: 0.5 /* Transparency (more transparent) */,
          },
        ],
      },
    };
  }

  render() {
    return <ZingChart id="histogramchart" data={this.state.config} />;
  }
}

export default HistogramChart;
