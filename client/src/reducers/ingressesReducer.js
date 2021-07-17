import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  ingresses: [],
};

function ingressesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_INGRESSES:
      const { items } = payload.data;
      let ingresses = [];
      items.forEach(ingress => {
        ingresses.push({
          creationTime: ingress.metadata.creationTimestamp,
          name: ingress.metadata.name,
          namespace: ingress.metadata.namespace,
          host: ingress.spec.rules[0].host,
          rules: ingress.spec.rules[0].http.path[0],
          status: ingress.status,
        });
      });
      return { ...state, ingresses };
    default:
      return state;
  }
}

export default ingressesReducer;
