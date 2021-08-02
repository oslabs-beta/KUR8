import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const receivePods = data => ({
  type: actionTypes.RECEIVE_PODS,
  payload: data,
});

export const receiveNodes = data => ({
  type: actionTypes.RECEIVE_NODES,
  payload: data,
});

export const receiveServices = data => ({
  type: actionTypes.RECEIVE_SERVICES,
  payload: data,
});

export const receiveDeployments = data => ({
  type: actionTypes.RECEIVE_DEPLOYMENTS,
  payload: data,
});

export const receiveIngresses = data => ({
  type: actionTypes.RECEIVE_INGRESSES,
  payload: data,
});

export const nodesFetchStarted = () => ({
  type: actionTypes.FETCH_STARTED,
});

export const nodesFetchComplete = () => ({
  type: actionTypes.FETCH_COMPLETE,
});

// TYPE 'RECEIVE_MASTER_NODES' is not being dispatched
const actionCreators = [
  receivePods,
  receiveServices,
  receiveIngresses,
  receiveDeployments,
  receiveNodes,
];

export const endpointArray = (url = 'localhost:3068') => [
  `http://${url}/podList`,
  `http://${url}/serviceList`,
  `http://${url}/ingressList`,
  `http://${url}/deploymentList`,
  `http://${url}/nodeList`,
];

// fetchData immediately returns a function that receives `dispatch` as an arugument due to `redux-thunk` middleware.
// redux-thunk middleware is applied in client/src/store.js
export const fetchData = () => async dispatch => {
  // urls is set to an array of URL strings as described on line 43.
  const urls = endpointArray();
  // Map returns an array. Here we map over the urls array to produce an array of promises in the form of fetch requests.
  const promises = urls.map(url => axios.get(url));
  // Toggle a loading flag to display a spinner while we receive the data
  dispatch(nodesFetchStarted());
  // Promise.all accepts an array of promises and waits for all promises to resolve.
  // Once all promises are resolved, we enter the `then` method, which receives an array of data objects, in this case we name that array `values`.
  // Each item in the `values` array is an object, which in turn is the resolution of it's corresponding promise from the `promises` array.
  await Promise.all(promises).then(values => {
    // `actionCreators` is an array of the actionCreators defined between lines 4 and 32.
    // We loop over this array with .forEach() to gain access to each actionCreator and it's index value.
    actionCreators.forEach((actionCreator, index) => {
      // Thanks to `redux-thunk`, we have access to the dispatch function via line 54.
      // Here we dispatch each individual actionCreator, passing in the corresponding data object at the same index.
      return dispatch(actionCreator(values[index]));
    });
  });
  // Toggle a loading flag to remove the spinner now that we have the data
  dispatch(nodesFetchComplete());
};
