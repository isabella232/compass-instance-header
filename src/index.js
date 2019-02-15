import InstanceHeaderPlugin from './plugin';
import InstanceHeaderStore from 'stores';

/**
 * Activate all the components in the Instance Header package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  appRegistry.registerComponent('InstanceHeader.Component', InstanceHeaderPlugin);
  appRegistry.registerStore('InstanceHeader.Store', InstanceHeaderStore);
}

/**
 * Deactivate all the components in the Instance Header package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterComponent('InstanceHeader.Component');
  appRegistry.deregisterStore('InstanceHeader.Store');
}

export default InstanceHeaderPlugin;
export { activate, deactivate };
