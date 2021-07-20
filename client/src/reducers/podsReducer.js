import * as actionsTypes from '../actions/actionsTypes';
import moment from 'moment';
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
            namespace: metadata.namespace,
            creationTimestamp: moment(metadata.creationTimestamp).format(
              'MMMM Do YYYY - h:mm:ss a'
            ),
            uid: metadata.uid,
          },
          spec: {
            nodeName: spec.nodeName,
            schedulerName: spec.schedulerName,
          },
          status: {
            phase: status.phase,
            startTime: moment(status.startTime).format(
              'MMMM Do YYYY - h:mm:ss a'
            ),
            hostIP: status.hostIP,
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
