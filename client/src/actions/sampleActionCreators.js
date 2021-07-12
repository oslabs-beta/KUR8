import * as actions from './actions';

export const doSomething = data => ({
  type: actions.TYPE_OF_ACTION,
  payload: data,
});

