import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  ingresses: [],
};

function ingressesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_INGRESSES:
      const { items } = payload.data;

      const { metadata, spec } = items[0];
      const ingressData = {
        metadata: {
          class: metadata.annotations['kubernetes.io/ingress.class'],
          creationTime: metadata.creationTimestamp,
          name: metadata.name,
          namespace: metadata.namespace,
          managedBy: metadata.labels['app.kubernetes.io/managed-by'],
          uid: metadata.uid,
        },
        host: spec.rules[0].host,
        paths: spec.rules[0].http.paths.map(path => ({
          pathType: path.pathType,
          serviceName: path.backend.serviceName,
          servicePort: path.backend.servicePort,
          path: path.path,
        })),
      };
      return { ingresses: ingressData };
    default:
      return state;
  }
}

export default ingressesReducer;
