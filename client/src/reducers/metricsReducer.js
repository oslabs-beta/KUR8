import * as actions from '../actions/actions';

const initialState = {};

function metricsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.ACTION_HERE:
      return state;
    default:
      return state;
  }
}

export default metricsReducer;
