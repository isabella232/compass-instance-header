import store from 'stores';
import AppRegistry from 'hadron-app-registry';
import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import { reset } from 'modules/reset';

describe('InstanceHeaderStore [Store]', () => {
  const WriteStateStore = Reflux.createStore({
    mixins: [StateMixin.store],
    getInitialState() {
      return { isWritable: true, description: 'store initial state description' };
    }
  });
  const NamespaceStore = Reflux.createStore({
    mixins: [StateMixin.store],
    getInitialState() {
      return { ns: 'initial' };
    },
    get ns() {
      return 'initial';
    }
  });


  describe('IndexesStore [Store]', () => {
    beforeEach(() => {
      store.dispatch(reset());
    });

    afterEach(() => {
      store.dispatch(reset());
    });

    describe('#onActivated', () => {
      const appRegistry = new AppRegistry();
      appRegistry.registerStore('DeploymentAwareness.WriteStateStore', WriteStateStore);
      appRegistry.registerStore('App.NamespaceStore', NamespaceStore);

      before(() => {
        store.onActivated(appRegistry);
      });

      context('when write state changes', () => {
        beforeEach(() => {
          expect(store.getState().activeNamespace).to.equal('initial'); // initial state
          expect(store.getState().name).to.equal('Retrieving instance information'); // initial state
          NamespaceStore.ns = 'test';
          WriteStateStore.setState({
            isWritable: false
          });
        });

        it('sets activeNamespace', () => {
          expect(store.getState().activeNamespace).to.equal('test');
        });
        it('sets name', () => {
          expect(store.getState().name).to.equal('My Cluster');
        });
      });

      context('when data service is initialized', () => {
        beforeEach(() => {
          expect(store.getState().connection).to.equal(null); // initial state
          expect(store.getState().name).to.equal('Retrieving instance information'); // initial state
          appRegistry.emit('data-service-initialized', {isFavorite: true, name: 'Test Cluster'});
        });

        it('sets connection', () => {
          expect(store.getState().connection).to.deep.equal({isFavorite: true, name: 'Test Cluster'});
        });
        it('sets name', () => {
          expect(store.getState().name).to.equal('Test Cluster');
        });
      });

      context('when collection changes', () => {
        beforeEach(() => {
          expect(store.getState().activeNamespace).to.equal('initial'); // initial state
          appRegistry.emit('collection-changed', 'new collection');
        });

        it('sets connection', () => {
          expect(store.getState().activeNamespace).to.equal('new collection');
        });
      });
      context('when db changes', () => {
        beforeEach(() => {
          expect(store.getState().activeNamespace).to.equal('initial'); // initial state
          appRegistry.emit('database-changed', 'new database');
        });

        it('sets connection', () => {
          expect(store.getState().activeNamespace).to.equal('new database');
        });
      });
    });
  });
});
