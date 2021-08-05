import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  isLoading: false,
  alertGroups: [],
};

function alertsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionsTypes.ALERTS_FETCH_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case actionsTypes.ALERTS_FETCH_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };
    case actionsTypes.RECEIVE_ALERTS:
      const { groups } = payload.data.data;
      let alertArr = [];
      let ruleArr = [];
      let alertObj = {};
      groups.forEach((alert, index) => {
        let { rules } = alert;

        rules.forEach((rule, index) => {
          ruleArr.push({
            name: rule.name,
            query: rule.query,
            timeMonitored: rule.duration,
            alerts: rule.alert,
            health: rule.health,
            evalTime: rule.evaluationTime,
            lastEval: rule.lastEvaluation,
            type: rule.type,
            state: rule.state,
            ...rule.annotations,
            ...rule.labels,
          });
        });

        alertObj = {
          [alert.name]: ruleArr,
        };

        alertArr.push(alertObj);
        alertObj = {};
        ruleArr = [];
      });

      return { ...state, alertGroups: alertArr };

    default:
      return state;
  }
}

export default alertsReducer;
