/**
 * Create name action.
 */
export const CHANGE_NAME = 'instance-header/name/CHANGE_NAME';

/**
 * The initial state of the instance header name.
 */
export const INITIAL_STATE = 'Retrieving connection information';

const CLUSTER = 'My Cluster';
const HOST_STRING_LENGTH = 30;

const connectionString = (name, showFull) => {
  return (name.length < HOST_STRING_LENGTH) || showFull ?
    name
    : `${name.substring(0, HOST_STRING_LENGTH)}...`;
};

/**
 * Reducer function for handle state changes to instance header name.
 *
 * @param {String} state - The instance header name state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === CHANGE_NAME) {
    return action.name;
  }
  return state;
}

export const setName = (name) => ({
  type: CHANGE_NAME,
  name: name
});

/**
 * The change name action creator.
 *
 * @param {String} name - The name.
 *
 * @returns {Object} The action.
 */
export const changeName = () => {
  return (dispatch, getState) => {
    const state = getState();
    const connection = state.connection;
    const name = state.connection.is_favorite ? connection.name : CLUSTER;
    dispatch(setName(connectionString(name)));
  };
};
