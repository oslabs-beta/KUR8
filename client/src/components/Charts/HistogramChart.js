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
        "scale-x":{  
          "values": this.props.defaultcharts[25].labelsArray,  
      },  
        series: [{
          values: this.props.defaultcharts[25].valueArray
        }]
      }
    }
  }
  
  render() {
    // console.log('defaultcharts',this.props.defaultcharts[25].labelsArray)
    return (
      <div>
        <select id="chart-selector" name="chart-selector">
    
          <option value="">Please Select An Option</option>
          <option value="0">0</option>
          <option value="1">1</option>
          
        </select>
        <ZingChart data={this.state.config}/>
      </div>
    );
  }
}


export default connect(
  state => ({
    defaultcharts: state.metricsReducer.defaultcharts,
  }),
  null
)(HistogramChart);