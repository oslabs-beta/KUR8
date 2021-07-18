import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  nodes: [],
};

function nodesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_NODES:
      const { items } = payload.data;
      let nodes = [];
      items.forEach(node => {
        nodes.push({
            
        });
      });
      return { ...state, nodes };
    default:
      return state;
  }
}

export default nodesReducer;
