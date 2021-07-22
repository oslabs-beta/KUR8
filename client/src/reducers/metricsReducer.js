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
      // console.log('default node exporter data', data)

      data.forEach((el) => {

        if(el.type === 'histogram'){
          const valueArray = [];
          const labelsArray = [];
          
          el.values.forEach((element) => {
            if(element.metricName === 'nodejs_gc_duration_seconds_sum') {
              valueArray.push(element.value * 1000);
              labelsArray.push(element.labels.kind);
              // innerChart.push(`help: ${el.help}, name: ${el.name}, type: ${el.type}, value: ${element.value}, aggregator: ${el.aggregator}`)
            }
          })
          el.valueArray = valueArray;
          el.labelsArray = labelsArray;
          chartArray.push(el)
        }

        
      })
      return {...state, defaultcharts: chartArray};

    case actionsTypes.RECEIVE_QUERY:
      let querychartsArray = [];
      console.log(payload.data.data,'payload')
      payload.data.data.forEach((el) => {
        querychartsArray.push(el.value)
      })
      return {...state, querycharts: querychartsArray};

    case actionsTypes.RECEIVE_QUERY_RANGE:
      let queryrangechartsArray = [];

      payload.data.data.result.forEach((el) => {

        console.log('RECEIVE_QUERY_RANGE',el)
        //el.metrics has the title of each line
        queryrangechartsArray.push(el.values)
      })
      return {...state, queryrangecharts: queryrangechartsArray};

    //create action/actionCreator first; use payload.data to manipulate the data; //array of 3 arrays, each for 1 node;
    return {...state, cpuGauge, CPUdata};
      let allData = payload.data;
      let CPUdata = [];
      let nodeCounter = 1;
      let targetData = allData.data.result;
      targetData.forEach((node) => {

        //[[kind-control-plane, Node 1, 87], ]
        CPUdata.push([node.metric.instance, `Node ${nodeCounter}`, node.metric.value[1]])
        nodeCounter++;
      });
      return {...state, cpuGauge: CPUdata};


    //{"status":"success","data":{"resultType":"vector","result":[{"metric":{"instance":"kind-control-plane"},"value":[1626837285.504,"87.5030092592592"]},{"metric":{"instance":"kind-worker"},"value":[1626837285.504,"87.49791666666671"]},{"metric":{"instance":"kind-worker2"},"value":[1626837285.504,"87.49791666666671"]}]}}
    default:
      return state;
  }
}

export default metricsReducer;
