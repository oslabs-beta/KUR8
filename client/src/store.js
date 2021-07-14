import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'

//ADD REDUCERS HERE
const rootReducer = combineReducers({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
