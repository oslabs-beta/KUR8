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
          name: pod.status.containerStatuses.name,
          nodeName: pod.spec.nodeName,
          image: pod.status.containerStatuses.image,
          state: pod.status.containerStatuses.state,
          started: pod.status.containerStatuses.started,
          imageId: pod.status.containerStatuses.imageID,
          containerId: pod.status.containerStatuses.containerID,
          startTime: pod.status.startTime,
          hostIp: pod.status.hostIP,
          phase: pod.status.phase,
          podIp: pod.status.podIp,
          statusConditions: pod.status.conditions,
        });
      });
      return { ...state, pods };
    default:
      return state;
  }
}

export default podsReducer;
