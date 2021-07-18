import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const receivePods = data => {
  return {
    type: actionTypes.RECEIVE_PODS,
    payload: data,
  };
};

export const receiveWorkerNodes = data => {
  return {
    type: actionTypes.RECEIVE_WORKER_NODES,
    payload: data,
  };
};

export const receiveMasterNodes = data => {
  return {
    type: actionTypes.RECEIVE_MASTER_NODES,
    payload: data,
  };
};

export const receiveServices = data => {
  return {
    type: actionTypes.RECEIVE_SERVICES,
    payload: data,
  };
};

export const receiveDeployments = data => {
  return {
    type: actionTypes.RECEIVE_DEPLOYMENTS,
    payload: data,
  };
};

export const receiveIngresses = data => {
  return {
    type: actionTypes.RECEIVE_INGRESSES,
    payload: data,
  };
};

const actionCreators = [
  receivePods,
  receiveServices,
  receiveIngresses,
  receiveDeployments,
  receiveWorkerNodes,
  receiveMasterNodes
];

export const endpointArray = (url = 'posts.com') => [
  `http://${url}/podList`,
  `http://${url}/serviceList`,
  `http://${url}/ingressList`,
  `http://${url}/deploymentList`,
  `http://${url}/nodeList`,
  `http://${url}/nodeList`,
];

export const fetchData = () => dispatch => {
  const urls = endpointArray();
  const promises = urls.map(url => axios.get(url));
  Promise.all(promises).then(values => {
    actionCreators.forEach((actionCreator, index) => {
      dispatch(actionCreator(values[index]));
    });
  });
};
