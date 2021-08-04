import React, { Component } from 'react';
import ZingChart from 'zingchart-react';

export class PodByNamespace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'bar',
        title: {
          text: 'Number of Pods Per Namespace',
          'font-color': 'black',
          backgroundColor: 'none',
          'font-size': '22px',
          alpha: 1,
          'adjust-layout': true,
        },
        globals: {
          'font-family': 'Roboto',
        },
        plot: {
          'border-radius': '9px' /* Rounded Corners */,
          width: '100%',
        },
        plotarea: {
          margin: 'dynamic',
          width: '100%',
        },
        'scale-x': {
          label: {
            text: 'Namespace' /* Scale Title */,
          },
          labels: this.stateLabel() /* Scale Labels */,
        },
        'scale-y': {
          label: {
            text: 'Number of Pods' /* Scale Title */,
          },
        },
        plot: {
          'bars-space-left': 0.15,
          'bars-space-right': 0.15,
          animation: {
            effect: 'ANIMATION_SLIDE_BOTTOM',
            sequence: 0,
            speed: 1500,
            delay: 200,
          },
        },
        'crosshair-x': {
          'line-width': '100%',
          alpha: 0.18,
        },
        series: [
          {
            values: this.seriesFormat(),
            'background-color':
              '#6666FF #FF0066' /* Bar fill color (gradient) */,
            borderRadiusTopLeft: 7,
            alpha: 0.5 /* Transparency (more transparent) */,
          },
        ],
      },
    };
    this.chartDone = this.chartDone.bind(this);
  }

  seriesFormat = () => {
    let valueArr = [];

    for (let i = 0; i < this.props.podPerNamespace.length; i++) {
      valueArr.push(Number(this.props.podPerNamespace[i][1]));
    }
    return valueArr;
  };

  stateLabel = () => {
    let labelArr = [];
    for (let i = 0; i < this.props.podPerNamespace.length; i++) {
      labelArr.push(this.props.podPerNamespace[i][0]);
    }
    return labelArr;
  };
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

export default PodByNamespace;
