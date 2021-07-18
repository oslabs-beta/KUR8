import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  deployments: [],
};

function deploymentsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.RECEIVE_DEPLOYMENTS:
      const { items } = payload.data;
      let deployments = [];
      items.forEach(deployment => {
        const { metadata, status } = deployment;
        deployments.push({
          metadata: {
            creationTime: metadata.creationTimestamp,
            name: metadata.name,
            namespace: metadata.namespace,
            managedBy: metadata.labels['app.kubernetes.io/managed-by'],
            uid: metadata.uid,
          },
          status: { ...status },
        });
      });
      return { ...state, deployments };
    default:
      return state;
  }
}

export default deploymentsReducer;
