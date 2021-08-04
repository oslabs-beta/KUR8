const { expect } = require('@jest/globals');
const alertsReducer = require('../../client/src/reducers/alertsReducer');

describe('alertsreducer', () => {
  let initialState;
  const fakeAction = { type: 'NOT_A_REAL_ACTION' };

  beforeEach(() => {
    initialState = {
      isLoading: false,
      alertGroups: [],
    };
  });

  it('should provide a default state', () => {
    const result = alertsReducer.default(undefined, fakeAction);
    expect(result).toEqual(initialState);
  });

  it('should return the same state object for unrecognized actions', () => {
    const result = alertsReducer.default(initialState, fakeAction);
    expect(result).toBe(initialState);
  });

  describe('ALERTS_FETCH_STARTED', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'ALERTS_FETCH_STARTED',
      };
    });

    it('isLoading should return true', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).toHaveProperty('isLoading', true);
    });

    it('should return a new state object', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });

  describe('ALERTS_FETCH_COMPLETE', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'ALERTS_FETCH_COMPLETE',
      };
    });

    it('isLoading should return false', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).toHaveProperty('isLoading', false);
    });

    it('should return a new state object', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });

  describe('RECEIVE_ALERTS', () => {
    let action;

    beforeEach(() => {
      action = {
        type: 'RECEIVE_ALERTS',
        payload: {
          data: {
            status: 'success',
            data: {
              groups: [],
            },
          },
        },
      };
    });

    it('should list all alerts in alertGroups', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).toHaveProperty('alertGroups', []);
    });

    it('should return a new state object', () => {
      const result = alertsReducer.default(initialState, action);
      expect(result).not.toBe(initialState);
    });
  });
});
