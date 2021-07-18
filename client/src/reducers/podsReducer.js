import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  pods: [],
};

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_PODS:
      const { items } = payload.data;
      let podArray = [];
      items.forEach(pod => {
        const { metadata, spec, status } = pod;
        podArray.push({
          containers: {
            list: [...spec.containers],
            conditions: [...status.containerStatuses],
            podIPs: [...status.podIPs],
          },
          metadata: {
            creationTimestamp: metadata.creationTimestamp,
            namespace: metadata.namespace,
            uid: metadata.uid,
          },
          spec: {
            nodeName: spec.nodeName,
            schedulerName: spec.schedulerName,
          },
          status: {
            startTime: status.startTime,
            hostIP: status.hostIP,
            phase: status.phase,
            podIP: status.podIP,
          },
        });
      });
      return { ...state, pods: podArray };
    default:
      return state;
  }
}

export default podsReducer;
