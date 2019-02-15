import { createStore, applyMiddleware } from 'redux';
import reducer from 'modules';
import thunk from 'redux-thunk';

import { appRegistryActivated} from 'modules/app-registry';
import { changeName } from 'modules/name';
import { changeConnection } from 'modules/connection';
import { changeActiveNamespace } from 'modules/active-namespace';

const store = createStore(reducer, applyMiddleware(thunk));

store.onActivated = (appRegistry) => {
// Events emitted from the app registry:
  appRegistry.on('data-service-initialized', (dataService) => {
    store.dispatch(changeConnection(dataService.client.model));
    store.dispatch(changeName());
  });

  appRegistry.getStore('DeploymentAwareness.WriteStateStore').listen(() => {
    const NSStore = appRegistry.getStore('App.NamespaceStore');
    store.dispatch(changeActiveNamespace(NSStore.ns || ''));
    store.dispatch(changeName());
  });


  appRegistry.on('collection-changed', (ns) => {
    store.dispatch(changeActiveNamespace(ns || ''));
  });

  appRegistry.on('database-changed', (ns) => {
    store.dispatch(changeActiveNamespace(ns || ''));
  });

  /**
   * Set the app registry to use later.
   */
  store.dispatch(appRegistryActivated(appRegistry));
};


export default store;
