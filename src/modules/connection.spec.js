import reducer, {
  INITIAL_STATE,
  changeConnection,
  CHANGE_CONNECTION
} from 'modules/connection';

describe('create connection module', () => {
  describe('#reducer', () => {
    context('when an action is provided', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, changeConnection('testing'))).to.equal('testing');
      });
    });

    context('when an action is not provided', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
      });
    });
  });

  describe('#changeConnection', () => {
    it('returns the action', () => {
      expect(changeConnection('test')).to.deep.equal({
        type: CHANGE_CONNECTION,
        connection: 'test'
      });
    });
  });
});
