import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const receiveDefaultMetrics = data => {
  return {
    type: actionTypes.RECEIVE_DEFAULT_METRICS,
    payload: data,
  };
};

export const receiveQuery = data => {
  return {
    type: actionTypes.RECEIVE_QUERY,
    payload: data,
  };
};

export const receiveQueryRange = data => {
  return {
    type: actionTypes.RECEIVE_QUERY_RANGE,
    payload: data,
  };
};

export const receiveCpuQueryRange = data => {
  return {
    type: actionTypes.RECEIVE_CPU_QUERY_RANGE,
    payload: data,
  };
};

export const fetchCPUData = data => {
  return {
    type: actionTypes.FETCH_CPU_DATA,
    payload: data,
  };
};

export const customQuery = data => {
  return {
    type: actionTypes.CUSTOM_QUERY,
    payload: data,
  };
};

const metricsActionCreators = [
  receiveDefaultMetrics, //using this one for garbage collection graph
  // receiveQuery,
  receiveCpuQueryRange, //The average amount of CPU time spent in system mode, per second, over the last minute (in seconds)
  receiveQueryRange, //The average network traffic received, per second, over the last minute (in bytes)
  fetchCPUData
];

export const metricsEndpointArray = (query, start, end, step) => [
  `http://localhost:8080/getMetrics`,
  // `http://localhost:9090/api/v1/query?query=rate(node_network_receive_bytes_total[1m])`
  `http://localhost:9090/api/v1/query_range?query=rate(node_cpu_seconds_total{mode="system"}[1m])&start=${new Date(new Date().setDate(new Date().getDate()-1)).toISOString()}&end=${new Date().toISOString()}&step=30s`,
  `http://localhost:9090/api/v1/query_range?query=rate(node_network_receive_bytes_total[1m])&start=${new Date(new Date().setDate(new Date().getDate()-1)).toISOString()}&end=${new Date().toISOString()}&step=30s`,
  `http://localhost:9090/api/v1/query?query=100%20-%20(avg%20by%20(instance)%20(rate(node_cpu_seconds_total[1m]))%20*%20100)`
];

//on page load, call to metricsFetchdata, take url on line 31, create promises with values being map to the link, (data from each link); resolve promises and dispath action creator on line 25 to the corresopnding result in the URLl; which send it over to the reducers
export const metricsFetchData = () => dispatch => {
  const urls = metricsEndpointArray();
  const promises = urls.map(url => axios.get(url));
  Promise.all(promises).then(values => {
    metricsActionCreators.forEach((actionCreator, index) => {
      dispatch(actionCreator(values[index]));
    });
  });
};

export const fetchCustomQuery = (query, range, step) => dispatch => {
  axios.get(`http://localhost:9090/api/v1/query_range?query=${query}&start=${new Date(new Date().setDate(new Date().getDate()-(24/range))).toISOString()}&end=${new Date().toISOString()}&step=${step}s`)
  .then(data => dispatch(customQuery(data)));
}