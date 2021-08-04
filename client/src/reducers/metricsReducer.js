import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  defaultcharts: [],
  querycharts: [],
  queryrangecharts: [],
  cpuGauge: [],
  cpuRangeChart: [],
  customDataArray: [],
  memoryNode: [],
  httpRequestData: [],
  cpuContainerData: [],
  allPromQL: [],
  podPerNamespace: [],
  podNotReady: [],
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
    let resultRange = payload.data.data.result;

    let range = [];
    resultRange.forEach((device, index) => {
      range.push([
        device.metric.device,
        device.values,
        device.metric.pod,
      ]);
    });
    return { ...state, querycharts: range };


   case actionsTypes.RECEIVE_CPU_QUERY_RANGE:
    let resultCpuRange = payload.data.data.result;

    let CPURange = [];
    resultCpuRange.forEach((cpu, index) => {
      CPURange.push([
        `CPU ${cpu.metric.cpu}`,
        cpu.values,
      ]);
    });
    return { ...state, cpuRangeChart: CPURange };


   case actionsTypes.FETCH_CPU_NODE:
     //create action/actionCreator first; use payload.data to manipulate the data; //array of 3 arrays, each for 1 node;
     let {result} = payload.data.data;

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

   case actionsTypes.FETCH_MEMORY_NODE:
     let resultMemory = payload.data.data.result;

     let memoryNode = [];
     resultMemory.forEach((node, index) => {
       memoryNode.push([
         node.metric.node,
         node.values,
       ]);
     });
     return { ...state, memoryNode: memoryNode };

  case actionsTypes.CUSTOM_QUERY:
    let newCustomDataArray = [...state.customDataArray];
    let newCustomData = [];
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
      newCustomData.push(el);
    });
    newCustomDataArray.push(newCustomData)
    return { ...state, customDataArray: newCustomDataArray };

   case actionsTypes.FETCH_HTTP_REQUEST:
     let resultRequest = payload.data.data.result;

     let httpRequest = [];
     resultRequest.forEach((thePath, index) => {

       httpRequest.push([
         thePath.metric.path,
         thePath.metric.method,
         thePath.values
       ]);
     });
     return { ...state, httpRequestData: httpRequest };

   case actionsTypes.FETCH_CPU_CONTAINER:
     let resultcpuContainer = payload.data.data.result;

     let cpuContainer = [];
     resultcpuContainer.forEach((container, index) => {
       cpuContainer.push([
         container.metric.id,
         container.values,
         container.metric.node,
       ]);
     });
     return { ...state, cpuContainer: cpuContainer };

     case actionsTypes.ALL_PROMQL:
       const allPromQL = payload.data.data
      return { ...state, allPromQL: allPromQL };

    case actionsTypes.HYDRATE_CUSTOM:
      const localdata = payload || [];
      return { ...state, customDataArray: localdata };

    case actionsTypes.DELETE_CUSTOM:
      const remaining = [...state.customDataArray];
      remaining.splice(payload, 1);
      return { ...state, customDataArray: remaining };

      case actionsTypes.MOVE_DND:
        return { ...state, customDataArray: payload };

   case actionsTypes.FETCH_NUM_POD_NAMESPACE:
     let resultPodPerNamespace = payload.data.data.result;

     let podNamespaceContainer = [];
     resultPodPerNamespace.forEach((namespace, index) => {
      podNamespaceContainer.push([
         namespace.metric.namespace,
         namespace.value[1],
       ]);
     });
     return { ...state, podPerNamespace: podNamespaceContainer };

   case actionsTypes.FETCH_POD_NOT_READY:
     let resultNotReadyPod = payload.data.data.result;

     let podNotWorking = [];
     resultNotReadyPod.forEach((namespace, index) => {

      podNotWorking.push([
         namespace.metric.namespace,
         namespace.values,
       ]);
     });
     return { ...state, podNotReady: podNotWorking };

    default:
      return state;
  }
}

export default metricsReducer;
