import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import podsReducer from './reducers/podsReducer'
import servicesReducer from './reducers/servicesReducer'
import deploymentsReducer from './reducers/deploymentsReducer'
import ingressesReducer from './reducers/ingressesReducer'

//ADD REDUCERS HERE
const rootReducer = combineReducers({
  pods: podsReducer,
  services: servicesReducer,
  deployments: deploymentsReducer,
  ingresses: ingressesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
