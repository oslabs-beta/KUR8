import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  defaultcharts: [],
  querycharts: [],
  queryrangecharts: [],
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
      console.log(payload.data.data,'payload')
      payload.data.data.forEach((el) => {
        querychartsArray.push(el.value)
      })
      return {...state, querycharts: querychartsArray};

    case actionsTypes.RECEIVE_QUERY_RANGE:
      let queryrangechartsArray = [];

      payload.data.data.result.forEach((el) => {

        console.log(el)
        //el.metrics has the title of each line
        queryrangechartsArray.push(el.values)
      })
      return {...state, queryrangecharts: queryrangechartsArray};

    default:
      return state;
  }
}

export default metricsReducer;
