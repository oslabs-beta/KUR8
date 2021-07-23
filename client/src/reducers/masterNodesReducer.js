import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  masternodes: [],
};

function masternodesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_MASTER_NODES:
      const datas = payload.data.response.body.items;
      const resultData = datas.filter(data => data.metadata.name.includes("kind-control-plane"));
      
      let masternodes = [];
      resultData.forEach(node => {
        masternodes.push({
          Name: node.metadata.name,
          UID: node.metadata.uid,
          CreationTime: node.metadata.creationTimestamp,
          Manager: node.metadata.managedFields[0].manager,
          MachineID: node.status.nodeInfo.machineID,
          Key: node.spec.taints[0].key,
          Address: node.status.address[0].address,

        });
      });
      return { ...state, masternodes };
    default:
      return state;
  }
}

export default masternodesReducer;
