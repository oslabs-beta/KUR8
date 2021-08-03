import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const receiveAlerts = data => ({
  type: actionTypes.RECEIVE_ALERTS,
  payload: data,
});
const alertsFetchStart = () => ({
  type: actionTypes.ALERTS_FETCH_STARTED,
});
const alertsFetchComplete = () => ({
  type: actionTypes.ALERTS_FETCH_COMPLETE,
});

export const fetchAlerts = () => dispatch => {
  dispatch(alertsFetchStart());
  axios
    .get(`http://localhost:9090/api/v1/rules`)
    .then(data => dispatch(receiveAlerts(data)))
    .then(() => dispatch(alertsFetchComplete()))
    .catch(error => console.log(`ERROR IN FETCH ALERTS: `, error));
};
