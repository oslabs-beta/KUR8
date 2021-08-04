const { expect } = require('@jest/globals');
const servicesReducer = require('../../client/src/reducers/servicesReducer');

describe('servicesReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      services: [],
    };
  });

  it('should provide a default state', () => {
    const result = servicesReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = servicesReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('RECEIVE_SERVICES', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_SERVICES',
        payload: {
          data: {
            status: 'success',
            items: [
              {
                metadata: {
                  creationTimestamp: 0,
                  name: 'name',
                  namespace: 'ns',
                  uid: 0,
                  labels: {
                    'app.kubernetes.io/managed-by': 'managed',
                    'k8s-app': 'k8s-app',
                    prometheus: 'prometheus',
                  },
                },
                spec: { clusterIP: '10.96.98.166' },
                status: { replicas: 1 },
              },
            ],
          },
        },
      };
    });

    it('should list an array of all services', () => {
      const result = servicesReducer.default(initialState, action);
      expect(result).toHaveProperty('services', [
        {
          metadata: {
            app: 'k8s-app',
            creationTime: 0,
            managedBy: 'managed',
            name: 'name',
            namespace: 'ns',
            prometheus: 'prometheus',
            uid: 0,
          },
          spec: {
            clusterIP: '10.96.98.166',
          },
          status: {
            replicas: 1,
          },
        },
      ]);
    });

    it('should return a new state object', () => {
      const result = servicesReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
