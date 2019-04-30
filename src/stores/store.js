import { createStore, applyMiddleware } from 'redux';
import reducer from 'modules';
import thunk from 'redux-thunk';

import { changeName } from 'modules/name';
import { changeConnection } from 'modules/connection';
import { changeActiveNamespace } from 'modules/active-namespace';
import { toggleIsGenuineMongoDB } from 'modules/is-genuine-mongodb';
import { toggleIsVisible } from 'modules/is-visible';

const store = createStore(reducer, applyMiddleware(thunk));

store.onActivated = (appRegistry) => {
  appRegistry.on('data-service-initialized', (dataService) => {
    store.dispatch(changeConnection(dataService.client.model));
    store.dispatch(changeName());
  });

  appRegistry.on('instance-refreshed', (state) => {
    const isGenuine = state.instance.genuineMongoDB === undefined ?
      { isGenuine: true, dbType: 'mongodb' } :
      state.instance.genuineMongoDB;

    store.dispatch(toggleIsGenuineMongoDB(isGenuine.isGenuine));
    store.dispatch(toggleIsVisible(!isGenuine.isGenuine));
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
