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
        deployments.push({
            creationTime: deployment.metadata.creationTimestamp,
            deploymentName: deployment.metadata.name,
            deploymentNamespace: deployment.metadata.namespace,
            replicas: deployment.spec.replicas,
            availableReplicas: deployment.status.availableReplicas,
            conditions: deployment.status.conditions[0]
        });
      });
      return { ...state, deployments };
    default:
      return state;
  }
}

export default deploymentsReducer;
