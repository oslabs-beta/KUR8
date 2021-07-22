import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  defaultcharts: [],
  querycharts: [],
  queryrangecharts: [],
  cpuGauge: [],
};

function metricsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_DEFAULT_METRICS:
      let { data } = payload;
      let chartArray = [];

      data.forEach(el => {
        if (el.type === 'histogram') {
          const valueArray = [];
          const labelsArray = [];

          el.values.forEach(element => {
            if (element.metricName === 'nodejs_gc_duration_seconds_sum') {
              valueArray.push(element.value * 1000);
              labelsArray.push(element.labels.kind);
              // innerChart.push(`help: ${el.help}, name: ${el.name}, type: ${el.type}, value: ${element.value}, aggregator: ${el.aggregator}`)
            }
          });
          el.valueArray = valueArray;
          el.labelsArray = labelsArray;
          chartArray.push(el);
        }
      });
      return { ...state, defaultcharts: chartArray };

    case actionsTypes.RECEIVE_QUERY:
      let querychartsArray = [];
      payload.data.data.forEach(el => {
        querychartsArray.push(el.value);
      });
      return { ...state, querycharts: querychartsArray };

    case actionsTypes.RECEIVE_QUERY_RANGE:
      let queryrangechartsArray = [];

      payload.data.data.result.forEach(el => {
        const xqueryrange = [];
        const yqueryrange = [];
        el.values.forEach(element => {
          xqueryrange.push(Math.floor(element[0]));
          yqueryrange.push(Math.floor(element[1]));
        });
        el.xqueryrange = xqueryrange;
        el.yqueryrange = yqueryrange;
        //el.metrics has the title of each line
        queryrangechartsArray.push(el);
      });
      return { ...state, queryrangecharts: queryrangechartsArray };
    case actionsTypes.FETCH_CPU_DATA:
      //create action/actionCreator first; use payload.data to manipulate the data; //array of 3 arrays, each for 1 node;
      let { result } = payload.data.data;

      let CPUdata = [];
      result.forEach((node, index) => {
        //[[kind-control-plane, Node 1, 87], ]
        CPUdata.push([
          node.metric.instance,
          `Node ${index + 1}`,
          node.value[1],
        ]);
      });
      return { ...state, cpuGauge: CPUdata };
    default:
      return state;
  }
}

export default metricsReducer;
