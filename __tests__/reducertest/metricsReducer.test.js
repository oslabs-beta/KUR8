const { expect } = require('@jest/globals');
const metricsReducer = require('../../client/src/reducers/metricsReducer');

describe('metricsReducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      defaultcharts: [],
      querycharts: [],
      queryrangecharts: [],
      cpuGauge: [],
      cpuRangeChart: [],
      customDataArray: [],
      memoryNode: [],
      httpRequestData: [],
      cpuContainerData: [],
      allPromQL: [],
      podPerNamespace: [],
      podNotReady: [],
    };
  });

  it('should provide a default state', () => {
    const result = metricsReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = metricsReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('CUSTOM_QUERY', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'CUSTOM_QUERY',
        payload: {
          data: {
            status: 'success',
            data: {
              result: [],
            },
          },
        },
      };
    });

    it('should list all arrays of charts in customDataArray', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).toHaveProperty('customDataArray', [[]]);
    });

    it('should return a new state object', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
