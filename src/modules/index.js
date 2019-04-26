import { combineReducers } from 'redux';

import activeNamespace, {
  INITIAL_STATE as ACTIVE_NAMESPACE_IS
} from 'modules/active-namespace';
import name, {
  INITIAL_STATE as NAME_IS
} from 'modules/name';
import connection, {
  INITIAL_STATE as CONNECTION_IS
} from 'modules/connection';
import isGenuineMongoDB, {
  INITIAL_STATE as GENUINE_IS
} from 'modules/is-genuine-mongodb';

import { RESET } from 'modules/reset';

/**
 * The reducer.
 */
const reducer = combineReducers({
  activeNamespace,
  name,
  connection,
  isGenuineMongoDB
});

/**
 * The root reducer.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const rootReducer = (state, action) => {
  if (action.type === RESET) {
    return {
      ...state,
      activeNamespace: ACTIVE_NAMESPACE_IS,
      name: NAME_IS,
      connection: CONNECTION_IS,
      isGenuineMongoDB: GENUINE_IS
    };
  }
  return reducer(state, action);
};

export default rootReducer;
