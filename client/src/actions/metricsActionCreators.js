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

export const fetchCPUData = data => {
  return {
    type: actionTypes.FETCH_CPU_DATA,
    payload: data,
  };
};

const metricsActionCreators = [
  receiveDefaultMetrics,
  // receiveQuery,
  receiveQueryRange,
  fetchCPUData
];

export const metricsEndpointArray = (query, start, end) => [
  `http://localhost:8080/getMetrics`,
  // `http://localhost:9090/api/v1/query?query=rate(node_network_receive_bytes_total[1m])`
  `http://localhost:9090/api/v1/query_range?query=rate(node_network_receive_bytes_total[1m])&start=2021-07-20T09:10:30.781Z&end=2021-07-21T15:30:00.781Z&step=15s`,
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
