import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  pods: [],
};

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_PODS:
      const { items } = payload.data;
      let pods = [];
      items.forEach(pod => {
        pods.push({
          name: pod.status.containerStatuses[0].name,
          nodeName: pod.spec.nodeName,
          image: pod.status.containerStatuses[0].image,
          state: pod.status.containerStatuses[0].state,
          started: pod.status.containerStatuses[0].started,
          imageId: pod.status.containerStatuses[0].imageID,
          containerId: pod.status.containerStatuses[0].containerID,
          startTime: pod.status.startTime,
          hostIp: pod.status.hostIP,
          phase: pod.status.phase,
          podIp: pod.status.podIp,
          statusConditions: pod.status.conditions[0],
        });
      });
      return { ...state, pods };
    default:
      return state;
  }
}

export default podsReducer;
