import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  services: [],
};

function servicesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_SERVICES:
      const { items } = payload.data;
      let services = [];
      items.forEach(service => {
        const { metadata, spec, status } = service;
        services.push({
          metadata: {
            creationTime: metadata.creationTimestamp,
            name: metadata.name,
            namespace: metadata.namespace,
            managedBy: metadata.labels['app.kubernetes.io/managed-by'],
            app: metadata.labels['k8s-app'],
            prometheus: metadata.labels.prometheus,
            uid: metadata.uid,
          },
          spec: { ...spec },
          status: { ...status },
        });
      });
      return { ...state, services };
    default:
      return state;
  }
}

export default servicesReducer;
