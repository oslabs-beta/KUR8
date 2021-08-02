import * as actionsTypes from '../actions/actionsTypes';

// state object will stay the same: a single property of alertGroups

// alertGroups should be an array of objects with each
// object being a single group

// Each group object should a single key of 'groupName',
// with it's corresponding value being an object with the
// following properties:
//   name
//   query
//   timeMonitored
//   alerts
//   health
//   evalTime
//   lastEval
//   type
//   state

const initialState = {
  alertGroups: [],
};

// case actionsTypes.FETCH_POD_NOT_READY:
//   let resultNotReadyPod = payload.data.data.result;

//   let podNotWorking = [];
//   resultNotReadyPod.forEach((namespace, index) => {
    
//    podNotWorking.push([
//       namespace.metric.namespace,
//       namespace.values,
//     ]);
//   });
//   return { ...state, podNotReady: podNotWorking };

function alertsReducer(state = initialState, action) {
 const { type, payload } = action;

 switch (type) {

  case actionsTypes.RECEIVE_ALERTS:
    const { groups } = payload.data.data;
    let alertArr = [];
    let ruleArr = [];
    let alertObj = {};
    groups.forEach((alert, index) => {
      let {rules} = alert;

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
          state: rule.state
        });
      });

      alertObj = {
        [alert.name]: ruleArr
        }

      alertArr.push(alertObj);
      alertObj = {};
      ruleArr = [];
    });

    console.log('alertArr', alertArr); 
    return { ...state, alertGroups: alertArr };

  default: 
    return state;
  }

}




export default alertsReducer;
