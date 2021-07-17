import * as actions from '../actions/actions';

const initialState = {};

function taskReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.ACTION_HERE:
      return state;
    case actions.ACTION_HERE:
      return state;
    case actions.ACTION_HERE:
      return state;
    default:
      return state;
  }
}

export default taskReducer;
