import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

class QueryRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'line',
        // plot: { stacked: true },
        title: {
          text: this.props.queryrangecharts[0].help
        },
        "scale-x":{  
          "values": this.props.queryrangecharts[0].yqueryrange,  
          zooming: true
        },
        "scale-y":{  
          // format: '%v \n bytes',
          item: {
            'font-size':8
          }
        },
        plot:{
          marker:{
            visible:false
          }
        },
        labels: [
          {
            id: 'reload_btn',
            text: 'Reload',
            padding: '5px',
            backgroundColor: '#fff',
            borderColor: '#777',
            borderRadius: '5px',
            borderWidth: '1px',
            cursor: 'hand',
            fontColor: '#777',
            x: '60px',
            y: '10px'
          }
        ],
        series: [
          { 
            values: this.props.queryrangecharts[0].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[1].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[2].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[3].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[4].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[5].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[6].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[7].yqueryrange
          },
          { 
            values: this.props.queryrangecharts[8].yqueryrange
          },
        ],
      },
    };
  }
  render() {
    console.log('queryrangecharts', this.props.queryrangecharts);

    return (
      <div>
        <ZingChart id="queryrangechart" data={this.state.config} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    queryrangecharts: state.metricsReducer.queryrangecharts,
  }),
  null
)(QueryRangeChart);
