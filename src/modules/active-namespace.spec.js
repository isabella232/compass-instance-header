import reducer, {
  INITIAL_STATE,
  changeActiveNamespace,
  CHANGE_ACTIVE_NAMESPACE
} from 'modules/active-namespace';

describe('create active namespace module', () => {
  describe('#reducer', () => {
    context('when an action is provided', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, changeActiveNamespace('testing'))).to.equal('testing');
      });
    });

    context('when an action is not provided', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
      });
    });
  });

  describe('#changeActiveNamespace', () => {
    it('returns the action', () => {
      expect(changeActiveNamespace('test')).to.deep.equal({
        type: CHANGE_ACTIVE_NAMESPACE,
        activeNamespace: 'test'
      });
    });
  });
});
