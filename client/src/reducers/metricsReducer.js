import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
 defaultcharts: [],
 querycharts: [],
 queryrangecharts: [],
 cpuGauge: [],
 cpuRangeChart: [],
 customDataArray: [],
 memoryGauge: [],
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
    //  console.log('this is in RECEIVE_QUERY_RANGE', payload.data);
     let queryrangechartsArray = [];
     payload.data.data.result.forEach(el => {
       const xqueryrange = [];
       const yqueryrange = [];
       // console.log('RECEIVE_QUERY_RANGE',el)
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

   case actionsTypes.RECEIVE_CPU_QUERY_RANGE:
    //  console.log('this is in RECEIVE_CPU_QUERY_RANGE', payload.data);
     let cpuRangeChart = [];
     payload.data.data.result.forEach(el => {
       const xcpurange = [];
       const ycpurange = [];
       el.values.forEach(element => {
         xcpurange.push(element[0]);
         ycpurange.push(element[1]);
       });
       el.xcpurange = xcpurange;
       el.ycpurange = ycpurange;
       //el.metrics has the title of each line

       cpuRangeChart.push(el);
     });
     return { ...state, cpuRangeChart: cpuRangeChart };

   case actionsTypes.FETCH_CPU_DATA:
     //create action/actionCreator first; use payload.data to manipulate the data; //array of 3 arrays, each for 1 node;
     let resultCPU = payload.data.data.result;

     let CPUdata = [];
     resultCPU.forEach((node, index) => {
       //[[kind-control-plane, Node 1, 87], ]
       CPUdata.push([
         node.metric.instance,
         `Node ${index + 1}`,
         node.value[1],
       ]);
     });
     return { ...state, cpuGauge: CPUdata };


  case actionsTypes.CUSTOM_QUERY:
    console.log('here in custom query reducer')
    let customDataArray = [];
    let customData = payload.data.data.result;
    customData.forEach(el => {
      const xRange = [];
      const yRange = [];
      el.values.forEach(element => {
        xRange.push(element[0]);
        yRange.push(element[1]);
      });
      el.xRange = xRange;
      el.yRange = yRange;
      //el.metrics has the title of each line
      customDataArray.push(el);
    });
    return { ...state, customDataArray: customDataArray };

   case actionsTypes.FETCH_MEMORY_DATA:
     //create action/actionCreator first; use payload.data to manipulate the data; //array of 3 arrays, each for 1 node;
     let resultMemory = payload.data.data.result;

     let Memorydata = [];
     resultMemory.forEach((node, index) => {
       //[[kind-control-plane, Node 1, 87], ]
       Memorydata.push([
         node.metric.instance,
         `Node ${index + 1}`,
         node.value[1],
       ]);
     });
     return { ...state, memoryGauge: Memorydata };

   default:
     return state;
 }
}

export default metricsReducer;


