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
      isLoading: false,
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

  describe('RECEIVE_DEFAULT_METRICS', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_DEFAULT_METRICS',
        payload: {
          status: 'success',
          data: [
            {
              type: 'histogram',
              values: [
                {
                  metricName: 'nodejs_gc_duration_seconds_sum',
                  value: 1,
                  labels: {
                    kind: 'pod',
                  },
                },
              ],
            },
          ],
        },
      };
    });

    it('should list an arrays of data points in defaultcharts', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).toHaveProperty('defaultcharts', [
        {
          labelsArray: ['pod'],
          type: 'histogram',
          valueArray: [1000],
          values: [
            {
              metricName: 'nodejs_gc_duration_seconds_sum',
              value: 1,
              labels: {
                kind: 'pod',
              },
            },
          ],
        },
      ]);
    });

    it('should return a new state object', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
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
              result: [
                {
                  metrics: {
                    __name__: 'ALERTS_FOR_STATE',
                    alertname: 'CPUThrottlingHigh',
                    container: 'blackbox-exporter',
                    namespace: 'monitoring',
                    pod: 'blackbox-exporter-6c95587d7-m224m',
                    severity: 'info',
                  },
                  values: [1628008072.054, '1628008052'],
                },
              ],
            },
          },
        },
      };
    });

    it('should return an array of charts in customDataArray', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).toHaveProperty('customDataArray', [
        [
          {
            metrics: {
              __name__: 'ALERTS_FOR_STATE',
              alertname: 'CPUThrottlingHigh',
              container: 'blackbox-exporter',
              namespace: 'monitoring',
              pod: 'blackbox-exporter-6c95587d7-m224m',
              severity: 'info',
            },
            values: [1628008072.054, '1628008052'],
            xRange: [undefined, '1'],
            yRange: [undefined, '6'],
          },
        ],
      ]);
    });

    it('should return a new state object', () => {
      const result = metricsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
