/**
 * Create active namespace action.
 */
export const CHANGE_ACTIVE_NAMESPACE = 'instance-header/active-namespace/CHANGE_ACTIVE_NAMESPACE';

/**
 * The initial state of the instance header active namespace.
 */
export const INITIAL_STATE = '';

/**
 * Reducer function for handle state changes to instance header active namespace.
 *
 * @param {String} state - The instance header active namespace state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === CHANGE_ACTIVE_NAMESPACE) {
    return action.activeNamespace;
  }
  return state;
}

/**
 * The change active namespace action creator.
 *
 * @param {String} activeNamespace - The activeNamespace.
 *
 * @returns {Object} The action.
 */
export const changeActiveNamespace = (activeNamespace) => ({
  type: CHANGE_ACTIVE_NAMESPACE,
  activeNamespace: activeNamespace
});
