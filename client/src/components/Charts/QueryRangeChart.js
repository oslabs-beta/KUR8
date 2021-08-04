import React, { Component } from 'react';
import ZingChart from 'zingchart-react';
import { withTheme } from '@material-ui/core/styles';

class QueryRangeChart extends Component {
  constructor(props) {
    super(props);
    this.dataFormat();
    // this.props.theme.palette.type,
  }

  dataFormat = () => {
    let outerContainer = [];
    let dataLength = this.props.querycharts.length;
    let valueObj = {};
    let values = [];
    let timeValue;
    let lineColor = [
      '#FF9AA2',
      '#FFB7B2',
      '#FFDAC1',
      '#E2F0CB',
      '#B5EAD7',
      '#C7CEEA',
      '#9ED2F6',
      '#9DDCE0',
      '#ADD4FF',
    ];

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.querycharts[i][1];

      for (let j = 0; j < timeValue.length; j++) {
        values.push(Number(timeValue[j][1]));
      }

      (valueObj = {
        values: values,
        'line-color': lineColor[i % lineColor.length],
        aspect: 'spline',
        'background-color': lineColor[i % lineColor.length],
        'alpha-area': '.5',
        'font-family': 'Roboto',
        'font-size': '14px',
        text: `${this.props.querycharts[i][0]}`,
      }),
        outerContainer.push(valueObj);
      valueObj = {};
      values = [];
    }
    return outerContainer;
  };

  dateFormat = () => {
    let dateArr = [];
    let timeValue;
    let dataLength = this.props.querycharts.length;
    let formatTime;
    let x;

    for (let i = 0; i < dataLength; i++) {
      timeValue = this.props.querycharts[i][1];

      for (let j = 0; j < timeValue.length; j++) {
        let time = `${new Date(Number(timeValue[j][0]) * 1000).toUTCString()}`;
        let timeArr = time.split(' ');
        let timePiece = timeArr[4].split(':');
        if (
          timePiece[0] === '01' ||
          timePiece[0] === '02' ||
          timePiece[0] === '03' ||
          timePiece[0] === '04' ||
          timePiece[0] === '05' ||
          timePiece[0] === '06' ||
          timePiece[0] === '07' ||
          timePiece[0] === '08' ||
          timePiece[0] === '09' ||
          timePiece[0] === '10' ||
          timePiece[0] === '11'
        ) {
          formatTime = `${timeArr[0]} ${timeArr[1]} ${timeArr[2]}\n${timeArr[4]} AM`;
        } else if (timePiece[0] === '00') {
          timePiece[0] = '12';
          let afterJoin = timePiece.join(':');
          formatTime = `${timeArr[0]} ${timeArr[1]} ${timeArr[2]}\n${afterJoin} AM`;
        } else if (
          timePiece[0] === '12' ||
          timePiece[0] === '13' ||
          timePiece[0] === '14' ||
          timePiece[0] === '15' ||
          timePiece[0] === '16' ||
          timePiece[0] === '17' ||
          timePiece[0] === '18' ||
          timePiece[0] === '19' ||
          timePiece[0] === '20' ||
          timePiece[0] === '21' ||
          timePiece[0] === '22' ||
          timePiece[0] === '23'
        ) {
          timePiece[0] = String(Number(timePiece[0]) - 12);
          let afterJoin = timePiece.join(':');
          formatTime = `${timeArr[0]} ${timeArr[1]} ${timeArr[2]}\n${afterJoin} PM`;
        }
        dateArr.push(formatTime);
      }
    }
    return dateArr;
  };

  labelFormat = () => {
    const labelContainer = [];
    let labelObj = {};
    let dataLength = this.props.querycharts.length;
    let lineColor = [
      '#FF9AA2',
      '#FFB7B2',
      '#FFDAC1',
      '#E2F0CB',
      '#B5EAD7',
      '#C7CEEA',
      '#9ED2F6',
      '#9DDCE0',
      '#ADD4FF',
    ];

    let start = 5;
    let secondStart = 15;
    let thirdStart = 25;

    for (let i = 0; i < dataLength; i++) {
      if (i <= 4) {
        labelObj = {
          text: `${this.props.querycharts[i][0]}-${this.props.querycharts[i][2]}: %plot-${i}-value`,
          'default-value': '',
          color: lineColor[i % lineColor.length],
          x: `${start}%`,
          y: 50,
          width: 120,
          'text-align': 'left',
          bold: 0,
          'font-size': '14px',
          'font-weight': 'bold',
        };
        start = start + 25;
      } else if (i <= 9) {
        labelObj = {
          text: `${this.props.querycharts[i][0]}: %plot-${i}-value`,
          'default-value': '',
          color: lineColor[i % lineColor.length],
          x: `${secondStart}%`,
          y: 65,
          width: 120,
          'text-align': 'left',
          bold: 0,
          'font-size': '14px',
          'font-weight': 'bold',
        };
        secondStart = secondStart + 25;
      } else if (i <= 9) {
        labelObj = {
          text: `${this.props.querycharts[i][0]}: %plot-${i}-value`,
          'default-value': '',
          color: lineColor[i % lineColor.length],
          x: `${thirdStart}%`,
          y: 80,
          width: 120,
          'text-align': 'left',
          bold: 0,
          'font-size': '14px',
          'font-weight': 'bold',
        };
        thirdStart = thirdStart + 25;
      }
      labelContainer.push(labelObj);
    }
    return labelContainer;
  };

  findMax = () => {
    let data = this.props.querycharts;
    let maximumVal = -Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] > maximumVal) {
          maximumVal = dataVal[j][0];
        }
      }
    }
    return maximumVal * 1000;
  };

  findMin = () => {
    let data = this.props.querycharts;
    let minimumVal = Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] < minimumVal) {
          minimumVal = dataVal[j][0];
        }
      }
    }
    return minimumVal * 1000;
  };

  render() {
    let myConfig = {
      "globals": {
        "font-family": "Roboto",
        "background-color": this.props.theme.palette.type === 'dark' ? '#424242': 'white',
        "color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
      },
      "graphset": [{
        "type": "area",
        // "utc": true,
        "title": {
          "y": "15px",
          "text": "The Average Network Traffic Received",
          "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
          "background-color": "none",
          "font-size": "24px",
          "height": "25px",
          "adjust-layout": true
        },
        "plotarea": {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true,
          'width':'100%',
          'height': '100%'
        },
        "labels": this.labelFormat(),
        "scale-x": {
          "label": {
            
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360,
          },
          "item": {
            "text-align": "center",
            "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
          },
          "zooming": 1,
          labels: this.dateFormat(),
          "max-items": 6,
          "min-items": 4,
          "items-overlap": true,
          "guide": {
            "line-width": "0px"
          },
          "tick": {
            "line-width": "2px"
          },
        },
        "crosshair-x": {
          "line-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
          "plot-label": {
            "border-radius": "5px",
            "border-width": "1px",
            "border-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
            "padding": "10px",
            "font-weight": "bold"
          },
          "scale-label": {
            "font-color": this.props.theme.palette.type === 'dark' ? 'white': '#424242',
            "background-color": this.props.theme.palette.type === 'dark' ? '#424242': 'white',
            "border-radius": "5px"
          },

          "line-width": 1,
          "plot-label": {
            "visible": false
          }
        },
        "scale-y": {
          "item": {
            "font-color": "black",
            "font-weight": "normal"
          },

          "label": {
            "text": "Query Range Data",
            "font-size": "14px"
          },
          "guide": {
            "line-width": "0px",
            "alpha": 0.2,
            "line-style": "dashed"
          }
        },
        "plot": {
          "line-width": 2,
          'width':'100%',
          'height': '100%',
          "marker": {
            "size": 1,
            "visible": false
          },
          "tooltip": {
            "font-family": "Roboto",
            "font-size": "15px",
            "text": `%t value is %v`,
            "text-align": "left",
            "border-radius": 5,
            "padding": 10
          }
        },
        "series": this.dataFormat()
      }]
    }
    return (
      <div>
        <ZingChart id="queryrangechart" data={myConfig} />
      </div>
    );
  }
}

export default withTheme(QueryRangeChart);
