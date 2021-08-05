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
      items.forEach(({ metadata, spec, status }) => {
        const containersArr = [];

        // Create a flat object of containerNames with their respective properties
        status.containerStatuses.forEach(container =>
          containersArr.push({
            [container.name]: { ...container },
          })
        );
        podArray.push({
          containers: containersArr,
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
