import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  alertGroups: [],
};

function alertsReducer(state = initialState, action) {
 const { type, payload } = action;

 switch (type) {

  case actionsTypes.RECEIVE_ALERTS:
    const { groups } = payload.data.data;
    return { ...state, alertGroups: groups };

  default:
    return state;
 }
}

export default alertsReducer;


