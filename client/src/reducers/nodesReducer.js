import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  masterNodes: [],
  workerNodes: [],
};

function nodesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // Only one case used due to both master and worker nodes being located within the same API endpoint
    case actionsTypes.RECEIVE_NODES:
      const { items } = payload.data.response.body;
      const processes = payload.data.nodeProcesses.response.body.items

      // Differentiate between master and worker nodes.
      const masterNodes = items.filter(data =>
        data.metadata.labels.hasOwnProperty('node-role.kubernetes.io/control-plane')
      );
      const workerNodes = items.filter(data =>
        !data.metadata.labels.hasOwnProperty('node-role.kubernetes.io/control-plane')
      );
      let masters = [];
      let workers = [];

      // Manipulate data to produce master nodes
      masterNodes.forEach(masterNode => {
        const { metadata, spec, status } = masterNode;
        let internalIP, hostName;

        status.addresses.forEach(address => {
          if (address.type === 'InternalIP') internalIP = address.address;
          if (address.type === 'Hostname') hostName = address.address;
        });

        masters.push({
          metadata: {
            name: metadata.name,
            uid: metadata.uid,
          },
          processes: processes.map(component => ({
            name: component.metadata.name,
            type: component.conditions[0].type,
            status: component.conditions[0].status
          })),
          status: {
            internalIP,
            hostName,
            capacity: {
              cpu: status.capacity.cpu,
              memory: status.capacity.memory,
              pods: status.capacity.pods,
            },
            conditions: status.conditions.map(condition => ({
              type: condition.type,
              message: condition.message,
            })),
            images: status.images.map(image => ({
              name: image.names[0],
              sizeBytes: image.sizeBytes,
            })),
            nodeInfo: {
              arch: status.nodeInfo.architecture,
              os: status.nodeInfo.operatingSystem,
              osImage: status.nodeInfo.osImage,
            },
          },
        });
      });

      // Manipulate data to produce worker nodes
      workerNodes.forEach(workerNode => {
        const { metadata, status } = workerNode;
        let internalIP, hostName;

        status.addresses.forEach(address => {
          if (address.type === 'InternalIP') internalIP = address.address;
          if (address.type === 'Hostname') hostName = address.address;
        });

        workers.push({
          metadata: {
            name: metadata.name,
            uid: metadata.uid,
          },
          status: {
            internalIP,
            hostName,
            capacity: {
              cpu: status.capacity.cpu,
              memory: status.capacity.memory,
              pods: status.capacity.pods,
            },
            conditions: status.conditions.map(condition => ({
              type: condition.type,
              message: condition.message,
            })),
            nodeInfo: {
              arch: status.nodeInfo.architecture,
              os: status.nodeInfo.operatingSystem,
              osImage: status.nodeInfo.osImage,
            },
          },
        });
      });
      return { ...state, masterNodes: masters, workerNodes: workers };
    default:
      return state;
  }
}

export default nodesReducer;
