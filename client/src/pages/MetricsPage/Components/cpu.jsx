// var Highcharts = require('highcharts');  
// var HighchartsReact = require('highcharts-react-official')
// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);  
// Create the chart
// Highcharts.chart('container', { /*Highcharts options*/ });
import React from 'react';

import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const CPUGauge = () => {

    const options = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6]
          }
        ]
      };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};
