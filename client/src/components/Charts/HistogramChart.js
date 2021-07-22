import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import "zingchart/modules-es6/zingchart-maps.min.js";
import "zingchart/modules-es6/zingchart-maps-usa.min.js";

class HistogramChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'bar',
        title: {
          text: this.props.defaultcharts[0].help
        },
        "scale-x":{  
          "values": this.props.defaultcharts[0].labelsArray,  
        },
        "scale-y":{  
          format: '%v ms'
          // item: {
          //   'font-size':8
          // }
        },
        series: [{
          values: this.props.defaultcharts[0].valueArray,
        }]
      }
    }
  }

  render() {

    return (
      <div>
        <ZingChart id='histogramchart' data={this.state.config}/>
      </div>
    );
  }
}


export default connect(
  state => ({
    defaultcharts: state.metricsReducer.defaultcharts,
    // histogramSelector: state.metricsReducer.histogramSelector,
  }),
  null
)(HistogramChart);