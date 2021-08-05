const { expect } = require('@jest/globals');
const deploymentsReducer = require('../../client/src/reducers/deploymentsReducer');

describe('deploymentsReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      deployments: [],
    };
  });

  it('should provide a default state', () => {
    const result = deploymentsReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = deploymentsReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('RECEIVE_DEPLOYMENTS', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_DEPLOYMENTS',
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
                  labels: { 'app.kubernetes.io/managed-by': 'managed' },
                },
                status: { replicas: 1 },
              },
            ],
          },
        },
      };
    });

    it('should return an array of all deployments', () => {
      const result = deploymentsReducer.default(initialState, action);
      expect(result).toHaveProperty('deployments', [
        {
          deploymentData: {
            metadata: {
              creationTime: 0,
              managedBy: 'managed',
              name: 'name',
              namespace: 'ns',
              uid: 0,
            },
            status: { replicas: 1 },
          },
        },
      ]);
    });

    it('should return a new state object', () => {
      const result = deploymentsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
