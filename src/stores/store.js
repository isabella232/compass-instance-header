import { createStore, applyMiddleware } from 'redux';
import reducer from 'modules';
import thunk from 'redux-thunk';

import { changeName } from 'modules/name';
import { changeConnection } from 'modules/connection';
import { changeActiveNamespace } from 'modules/active-namespace';
import { toggleIsGenuineMongoDB } from 'modules/is-genuine-mongodb';

const store = createStore(reducer, applyMiddleware(thunk));

store.onActivated = (appRegistry) => {
  appRegistry.on('data-service-initialized', (dataService) => {
    store.dispatch(changeConnection(dataService.client.model));
    store.dispatch(changeName());
  });

  appRegistry.on('data-service-connected', () => {
    const isGenuine = global.hadronApp.instance.genuineMongoDB === undefined ?
      { isGenuine: true } :
      global.hadronApp.instance.genuineMongoDB;

    store.dispatch(toggleIsGenuineMongoDB(isGenuine.isGenuine));
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
};


export default store;
