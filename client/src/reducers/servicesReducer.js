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
        services.push({
            creationTime: service.metadata.creationTimestamp,
            serviceName: service.metadata.name,
            clusterIPs: service.spec.clusterIPs,
            port: service.spec.ports[0].port,
            serviceType: service.spec.type,
            ipFamily: service.spec.ipFamilies
        });
      });
      return { ...state, services };
    default:
      return state;
  }
}

export default servicesReducer;
