import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const receiveAlerts = (data) => {
  return {
    type: actionTypes.RECEIVE_ALERTS,
    payload: data,
  };
};

export const fetchAlerts = () => (dispatch) => {
  axios
    .get(`http://localhost:9090/api/v1/rules`)
    .then((data) => dispatch(receiveAlerts(data)));
};
