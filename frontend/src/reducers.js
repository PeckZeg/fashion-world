import { combineReducers } from 'redux';
import * as _ from 'lodash';

function test(state = null, action) {
  switch (action.type) {
    case 'test':
      return Object.assign({}, state, {
        [action.id]: action.data
      });

    default:
      return state;
  }
}

function temples(state = {}, action) {
  switch (action.type) {
    case 'temples':
      let temples = Object.assign({}, state);

      _.each(action.data, temple => {
        Object.assign(temples, {
          [temple.id]: temple
        });
      });

      return temples;

    default:
      return state;
  }
}

export default combineReducers({
  test,
  temples
});
