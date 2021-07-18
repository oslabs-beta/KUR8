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
        const { metadata, spec, status } = ingress;
        ingresses.push({
          metadata: {
            class: metadata.annotations['kubernetes.io/ingress.class'],
            creationTime: metadata.creationTimestamp,
            name: metadata.name,
            namespace: metadata.namespace,
            managedBy: metadata.labels['app.kubernetes.io/managed-by'],
            uid: metadata.uid,
          },
          host: spec.rules[0].host,
          paths: [
            ...spec.rules[0].http.paths.map(path => ({
              path: path.path,
              serviceName: path.backend.serviceName,
              servicePort: path.backend.servicePort,
            })),
          ],
          ingressIPs: [...status.loadBalancer.ingress],
        });
      });
      return { ...state, ingresses };
    default:
      return state;
  }
}

export default ingressesReducer;
