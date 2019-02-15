/**
 * Create connection action.
 */
export const CHANGE_CONNECTION = 'instance-header/connection/CHANGE_CONNECTION';

/**
 * The initial state of the instance header connection.
 */
export const INITIAL_STATE = null;

/**
 * Reducer function for handle state changes to create instance header connection.
 *
 * @param {String} state - The create instance header connection state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === CHANGE_CONNECTION) {
    return action.connection;
  }
  return state;
}

/**
 * The change connection action creator.
 *
 * @param {String} connection - The connection.
 *
 * @returns {Object} The action.
 */
export const changeConnection = (connection) => ({
  type: CHANGE_CONNECTION,
  connection: connection
});
