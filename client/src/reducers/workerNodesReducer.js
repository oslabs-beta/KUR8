import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  workernodes: [],
};

function workernodesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_WORKER_NODES:
      const datas = payload.data.response.body.items;
      const resultData = datas.filter(data => data.metadata.name.includes("kind-worker"));
      
      let workernodes = [];
      resultData.forEach(node => {
        workernodes.push({
          Name: node.metadata.name,
          UID: node.metadata.uid,
          CreationTime: node.metadata.creationTimestamp,
          Manager: node.metadata.managedFields[0].manager,
          MachineID: node.status.nodeInfo.machineID,
          // Key: node.spec.taints[0].key,
          Address: node.status.address[0].address,

        });
      });
      return { ...state, workernodes };
    default:
      return state;
  }
}

export default workernodesReducer;
