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

const metricsActionCreators = [
  receiveDefaultMetrics,
  receiveQuery,
  // receiveQueryRange,
];

export const metricsEndpointArray = (query, start, end) => [
  `http://localhost:8080/getMetrics`,
  `http://localhost:9090/api/v1/query=rate(container_cpu_usage_seconds_total{image!=""}[5m])`
  // `http://localhost:9090/api/v1/query_range=${query}&start=${start}&end=${end}`,
];

export const metricsFetchData = () => dispatch => {
  const urls = metricsEndpointArray();
  const promises = urls.map(url => axios.get(url));
  Promise.all(promises).then(values => {
    metricsActionCreators.forEach((actionCreator, index) => {
      dispatch(actionCreator(values[index]));
    });
  });
};
