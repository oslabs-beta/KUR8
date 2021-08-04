const { expect } = require('@jest/globals');
const podsReducer = require('../../client/src/reducers/podsReducer');

describe('podsReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      pods: [],
    };
  });

  it('should provide a default state', () => {
    const result = podsReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = podsReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('RECEIVE_PODS', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_PODS',
        payload: {
          data: {
            status: 'success',
            items: [
              {
                metadata: {
                  creationTimestamp: "2021-08-04T04:10:12.000Z",
                  namespace: 'ns',
                  uid: 0,
                },
                spec: {
                  nodeName: 'nodename',
                  schedulerName: 'schedulerName',
                },
                status: {
                  containerStatuses: [{ name: 'containername' }],
                  phase: 'phase',
                  startTime: "2021-08-04T04:10:12.000Z",
                  hostIP: '172.18.0.4',
                  podIP: '10.244.2.23',
                },
              },
            ],
          },
        },
      };
    });

    it('should return an array of all pods', () => {
      const result = podsReducer.default(initialState, action);
      expect(result).toHaveProperty('pods', [
        {
          containers: [
            {
              containername: {
                name: 'containername',
              },
            },
          ],
          metadata: {
            creationTimestamp: "August 3rd 2021 - 9:10:12 pm",
            namespace: 'ns',
            uid: 0,
          },
          spec: {
            nodeName: 'nodename',
            schedulerName: 'schedulerName',
          },
          status: {
            hostIP: '172.18.0.4',
            phase: 'phase',
            podIP: '10.244.2.23',
            startTime: "August 3rd 2021 - 9:10:12 pm",
          },
        },
      ]);
    });

    it('should return a new state object', () => {
      const result = podsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
