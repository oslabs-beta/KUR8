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
      console.log('default data', data)
      data.forEach((el) => {
        if(el.type = 'histogram'){
          const valueArray = [];
          const labelsArray = [];
          el.values.forEach((element) => {
            valueArray.push(element.value);
            labelsArray.push(element.labels.space);
            // innerChart.push(`help: ${el.help}, name: ${el.name}, type: ${el.type}, value: ${element.value}, aggregator: ${el.aggregator}`)
          })
          el.valueArray = valueArray;
          el.labelsArray = labelsArray;
          chartArray.push(el)
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
