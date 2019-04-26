import React from 'react';
import ReactDOM from 'react-dom';
import app from 'hadron-app';
import AppRegistry from 'hadron-app-registry';
import { AppContainer } from 'react-hot-loader';
import InstanceHeaderPlugin, { activate } from 'plugin';
import DeploymentStateStore from './stores/deployment-state-store';
import NamespaceStore from './stores/namespace-store';
import { activate as deploymentAwarenessActivate } from '@mongodb-js/compass-deployment-awareness';

// Import global less file. Note: these styles WILL NOT be used in compass, as compass provides its own set
// of global styles. If you are wishing to style a given component, you should be writing a less file per
// component as per the CSS Modules ICSS spec. @see src/components/toggle-button for an example.
import 'bootstrap/less/bootstrap.less';
import 'less/index.less';

const appRegistry = new AppRegistry();

global.hadronApp = app;
global.hadronApp.appRegistry = appRegistry;
global.hadronApp.instance = { genuineMongoDB: { isGenuine: true } };

// Activate our plugin with the Hadron App Registry
activate(appRegistry);

// Add the one role for the right side
deploymentAwarenessActivate(appRegistry);

appRegistry.registerStore('DeploymentAwareness.WriteStateStore', DeploymentStateStore);
appRegistry.registerStore('App.NamespaceStore', NamespaceStore);

appRegistry.onActivated();
NamespaceStore.ns = 'citibike.trips';


// Since we are using HtmlWebpackPlugin WITHOUT a template,
// we should create our own root node in the body element before rendering into it.
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Create a HMR enabled render function
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component sidebarCollapsed={false}/>
    </AppContainer>,
    document.getElementById('root')
  );
};

// For initialization events to happen in isolation, uncomment the
// following lines as needed in the same places they are commented out.
//
// // Application was initialized.
// appRegistry.emit('application-initialized', '1.11.0-dev');

// Render our plugin - don't remove the following line.
render(InstanceHeaderPlugin);

// Data service initialization and connection.
import Connection from 'mongodb-connection-model';
import DataService from 'mongodb-data-service';

const connection = new Connection({
  hostname: '127.0.0.1',
  port: 27017
});
const dataService = new DataService(connection);

appRegistry.emit('data-service-initialized', dataService);
DeploymentStateStore.setToInitial();
dataService.connect((error, ds) => {
  appRegistry.emit('data-service-connected', error, ds);
});

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (message) => { // eslint-disable-line no-console
    if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
      // Log the error as normally
      orgError.apply(console, [message]);
    }
  };

  module.hot.accept('plugin', () => {
    // Because Webpack 2 has built-in support for ES2015 modules,
    // you won't need to re-require your app root in module.hot.accept
    render(InstanceHeaderPlugin);
  });
}
