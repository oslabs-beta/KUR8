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
      const processes = payload.data.nodeProcesses.response.body.items;

      // Differentiate between master and worker nodes.
      const masterNodes = items.filter(data =>
        data.metadata.labels.hasOwnProperty(
          'node-role.kubernetes.io/control-plane'
        )
      );
      const workerNodes = items.filter(
        data =>
          !data.metadata.labels.hasOwnProperty(
            'node-role.kubernetes.io/control-plane'
          )
      );
      let masters = [];
      let workers = [];

      // MASTER: Manipulate data to produce master nodes
      masterNodes.forEach(masterNode => {
        const { metadata, status } = masterNode;
        const processesObj = {};
        const processesKeys = [];
        const processesValues = [];
        const masterConditionsObj = {};
        const masterConditionsKeys = [];
        const masterConditionsValues = [];
        let internalIP, hostName;

        // MASTER: Extract proper values from addresses by type
        status.addresses.forEach(address => {
          if (address.type === 'InternalIP') internalIP = address.address;
          if (address.type === 'Hostname') hostName = address.address;
        });

        // MASTER: Extract keys and values into seperate arrays to construct masterConditionsObj
        processes.forEach(propertyObj => {
          for (const [key, value] of Object.entries(propertyObj)) {
            if (key === 'metadata') {
              processesKeys.push(value.name);
            }
            if (key === 'conditions') {
              processesValues.push(value[0].type);
            }
          }
        });

        // MASTER: Construct processesObj with proper key/values
        processesKeys.forEach((key, index) => {
          processesObj[key] = processesValues[index];
        });

        // MASTER: Extract keys and values into seperate arrays to construct masterConditionsObj
        status.conditions.forEach(condition => {
          for (const [key, value] of Object.entries(condition)) {
            if (key === 'type') masterConditionsKeys.push(value);
            if (key === 'message') masterConditionsValues.push(value);
          }
        });

        // MASTER: Construct masterConditionsObj with proper key/values
        masterConditionsKeys.forEach((key, index) => {
          masterConditionsObj[key] = masterConditionsValues[index];
        });

        masters.push({
          metadata: {
            name: metadata.name,
            uid: metadata.uid,
          },
          processes: processesObj,
          status: {
            internalIP,
            hostName,
          },
          capacity: {
            cpu: status.capacity.cpu,
            memory: status.capacity.memory,
            pods: status.capacity.pods,
          },
          conditions: masterConditionsObj,
          nodeInfo: {
            arch: status.nodeInfo.architecture,
            os: status.nodeInfo.operatingSystem,
            osImage: status.nodeInfo.osImage,
          },
        });
      });

      // WORKER: Manipulate data to produce worker nodes
      workerNodes.forEach(workerNode => {
        const workerConditionsObj = {};
        const workerConditionsKeys = [];
        const workerConditionsValues = [];
        const { metadata, status } = workerNode;
        let internalIP, hostName;

        // WORKER: Extract proper values from addresses by type
        status.addresses.forEach(address => {
          if (address.type === 'InternalIP') internalIP = address.address;
          if (address.type === 'Hostname') hostName = address.address;
        });

        // WORKER: Extract keys and values into seperate arrays to construct masterworkerConditionsObj
        status.conditions.forEach(condition => {
          for (const [key, value] of Object.entries(condition)) {
            if (key === 'type') workerConditionsKeys.push(value);
            if (key === 'message') workerConditionsValues.push(value);
          }
        });

        // WORKER: Construct masterworkerConditionsObj with proper key/values
        workerConditionsKeys.forEach((key, index) => {
          workerConditionsObj[key] = workerConditionsValues[index];
        });

        workers.push({
          metadata: {
            name: metadata.name,
            uid: metadata.uid,
          },
          status: {
            internalIP,
            hostName,
          },
          capacity: {
            cpu: status.capacity.cpu,
            memory: status.capacity.memory,
            pods: status.capacity.pods,
          },
          conditions: workerConditionsObj,
          nodeInfo: {
            arch: status.nodeInfo.architecture,
            os: status.nodeInfo.operatingSystem,
            osImage: status.nodeInfo.osImage,
          },
        });
      });
      return { ...state, masterNodes: masters, workerNodes: workers };
    default:
      return state;
  }
}

export default nodesReducer;
