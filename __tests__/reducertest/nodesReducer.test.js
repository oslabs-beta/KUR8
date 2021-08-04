const { expect } = require('@jest/globals');
const nodesReducer = require('../../client/src/reducers/nodesReducer');

describe('nodesReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      isLoading: false,
      masterNodes: [],
      workerNodes: [],
    };
  });

  it('should provide a default state', () => {
    const result = nodesReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = nodesReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('NODE_FETCH_STARTED', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'NODE_FETCH_STARTED',
      };
    });

    it('isLoading should return true', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).toHaveProperty('isLoading', true);
    });

    it('should return a new state object', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });

  describe('NODE_FETCH_COMPLETE', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'NODE_FETCH_COMPLETE',
      };
    });

    it('isLoading should return false', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).toHaveProperty('isLoading', false);
    });

    it('should return a new state object', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });

  describe('RECEIVE_NODES', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_NODES',
        payload: {
          data: {
            status: 'success',
            response: {
              body: {
                items: [
                  {
                    metadata: {
                      creationTimestamp: 0,
                      namespace: 'ns',
                      uid: 0,
                      labels: {
                        'node-role.kubernetes.io/control-plane':
                          'control-plane',
                      },
                    },
                    spec: {
                      nodeName: 'nodename',
                      schedulerName: 'schedulerName',
                    },
                    status: {
                      containerStatuses: [{ name: 'containername' }],
                      phase: 'phase',
                      startTime: 0,
                      hostIP: '172.18.0.4',
                      podIP: '10.244.2.23',
                      addresses: [
                        { type: 'InternalIP', address: '172.18.0.5' },
                        { type: 'Hostname', address: 'control-plane' },
                      ],
                      conditions: [
                        {
                          type: 'MemoryPressure',
                          message: 'kubelet has sufficient memory available',
                        },
                      ],
                      capacity: {
                        cpu: '12',
                        memory: '13029544Ki',
                        pods: '110',
                      },
                      nodeInfo: {
                        architecture: 'amd64',
                        operatingSystem: 'linux',
                        osImage: 'Ubuntu 21.04',
                      },
                    },
                  },
                  {
                    metadata: {
                      creationTimestamp: 0,
                      namespace: 'ns',
                      uid: 0,
                      labels: {},
                    },
                    spec: {
                      nodeName: 'nodename',
                      schedulerName: 'schedulerName',
                    },
                    status: {
                      containerStatuses: [{ name: 'containername' }],
                      phase: 'phase',
                      startTime: 0,
                      hostIP: '172.18.0.4',
                      podIP: '10.244.2.23',
                      addresses: [
                        { type: 'InternalIP', address: '172.18.0.5' },
                        { type: 'Hostname', address: 'control-plane' },
                      ],
                      conditions: [
                        {
                          type: 'MemoryPressure',
                          message: 'kubelet has sufficient memory available',
                        },
                      ],
                      capacity: {
                        cpu: '12',
                        memory: '13029544Ki',
                        pods: '110',
                      },
                      nodeInfo: {
                        architecture: 'amd64',
                        operatingSystem: 'linux',
                        osImage: 'Ubuntu 21.04',
                      },
                    },
                  },
                ],
              },
            },
            nodeProcesses: {
              response: {
                body: {
                  items: [{}],
                },
              },
            },
          },
        },
      };
    });

    it('should list all masternodes and worknodes', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).toHaveProperty('masterNodes', [
        {
          capacity: {
            cpu: '12',
            memory: '13029544Ki',
            pods: '110',
          },
          conditions: {
            MemoryPressure: 'kubelet has sufficient memory available',
          },
          metadata: {
            name: undefined,
            uid: 0,
          },
          nodeInfo: {
            arch: 'amd64',
            os: 'linux',
            osImage: 'Ubuntu 21.04',
          },
          processes: {},
          status: {
            hostName: 'control-plane',
            internalIP: '172.18.0.5',
          },
        },
      ]);

      expect(result).toHaveProperty('workerNodes', [
        {
          capacity: {
            cpu: '12',
            memory: '13029544Ki',
            pods: '110',
          },
          conditions: {
            MemoryPressure: 'kubelet has sufficient memory available',
          },
          metadata: {
            name: undefined,
            uid: 0,
          },
          nodeInfo: {
            arch: 'amd64',
            os: 'linux',
            osImage: 'Ubuntu 21.04',
          },
          status: {
            hostName: 'control-plane',
            internalIP: '172.18.0.5',
          },
        },
      ]);
    });

    it('should return a new state object', () => {
      const result = nodesReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
