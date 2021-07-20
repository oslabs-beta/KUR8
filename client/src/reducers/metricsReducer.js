import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  defaultcharts: [],
  // querycharts: [],
};

function metricsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case actionsTypes.RECEIVE_DEFAULT_METRICS:
      const { data } = payload;
      let chartArray = [];
      data.forEach((el) => {
        if(el.name.includes('cpu')){
          chartArray.push(`help: ${el.help}, name: ${el.name}, type: ${el.type}, value: ${el.values[0]}, aggregator: ${el.aggregator} `)
        }
      })
      return {...state, defaultcharts: chartArray};

    case actionsTypes.RECEIVE_QUERY:
      let querychartsArray = [];
      console.log(payload.data.data.result,'payload')
      payload.data.data.result.forEach((el) => {
        console.log('in for each')
        querychartsArray.push(el.value)
      })
      return {...state, querycharts: querychartsArray};

    default:
      return state;
  }
}

export default metricsReducer;
