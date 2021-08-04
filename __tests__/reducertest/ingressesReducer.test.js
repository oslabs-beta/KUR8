const { expect } = require('@jest/globals');
const ingressesReducer = require('../../client/src/reducers/ingressesReducer');

describe('ingressesReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      ingresses: [],
    };
  });

  it('should provide a default state', () => {
    const result = ingressesReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = ingressesReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('RECEIVE_INGRESSES', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_INGRESSES',
        payload: {
          data: {
            status: 'success',
            items: [
              {
                metadata: {
                  annotations: { 'kubernetes.io/ingress.class': 'class' },
                  creationTimestamp: 0,
                  name: 'name',
                  namespace: 'ns',
                  uid: 0,
                  labels: { 'app.kubernetes.io/managed-by': 'managed' },
                },
                spec: {
                  rules: [
                    {
                      host: 'host',
                      http: {
                        paths: [
                          {
                            pathType: 'pathtype',
                            backend: {
                              serviceName: 'serviceName',
                              servicePort: 'servicePort',
                              path: 'path',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      };
    });

    it('should list an array of all ingresses', () => {
      const result = ingressesReducer.default(initialState, action);
      expect(result).toHaveProperty('ingresses', {
        host: 'host',
        metadata: {
          class: 'class',
          creationTime: 0,
          managedBy: 'managed',
          name: 'name',
          namespace: 'ns',
          uid: 0,
        },
        paths: [
          {
            path: undefined,
            pathType: 'pathtype',
            serviceName: 'serviceName',
            servicePort: 'servicePort',
          },
        ],
      });
    });

    it('should return a new state object', () => {
      const result = ingressesReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
