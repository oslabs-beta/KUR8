import * as actionsTypes from './actionsTypes';

export const receivePods = data => {
  return {
    type: ActionTypes.RECEIVE_PODS,
    payload: data,
  };
};


export const receiveServices = data => {
  return {
    type: ActionTypes.RECEIVE_SERVICES,
    payload: data,
  };
};

export const receiveDeployments = data => {
  return {
    type: ActionTypes.RECEIVE_DEPLOYMENTS,
    payload: data,
  };
};

export const receiveIngresses = data => {
  return {
    type: ActionTypes.RECEIVE_INGRESSES,
    payload: data,
  };
};

export const endpointArray = (url = 'posts.com') => [
  `http://${url}/podList`,
  `http://${url}/serviceList`,
  `http://${url}/ingressList`,
  `http://${url}/deploymentList`,
];

export const fetchData = rootUrl => dispatch => {
  const urls = endpointArray(rootUrl);
  const promises = urls.map(url => axios.get(url));
  Promise.all(promises).then(values => {
    actionCreators.forEach((actionCreator, index) => {
      dispatch(actionCreator(values[index]));
    });
  });
};
