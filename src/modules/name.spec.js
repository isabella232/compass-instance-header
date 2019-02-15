import reducer, {
  INITIAL_STATE,
  setName,
  changeName,
  SET_NAME
} from 'modules/name';

describe('create name module', () => {
  describe('#reducer', () => {
    context('when an action is provided', () => {
      it('returns the new state', () => {
        expect(reducer(undefined, setName('testing'))).to.equal('testing');
      });
    });

    context('when an action is not provided', () => {
      it('returns the default state', () => {
        expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
      });
    });
  });

  describe('#setName', () => {
    it('returns the action', () => {
      expect(setName('test')).to.deep.equal({
        type: SET_NAME,
        name: 'test'
      });
    });
  });

  let setNameSpy;
  describe('#changeName', () => {
    beforeEach(() => {
      setNameSpy = sinon.spy();
    });
    afterEach(() => {
      setNameSpy = null;
    });
    it('calls setName for changeName if favorite', () => {
      const dispatch = (res) => {
        expect(res).to.deep.equal({
          type: SET_NAME,
          name: 'test'
        });
        setNameSpy();
      };
      const state = () => ({
        connection: { is_favorite: true, name: 'test' }
      });
      changeName()(dispatch, state);
      expect(setNameSpy.calledOnce).to.equal(true);
    });
    it('calls setName for changeName if not favorite', () => {
      const dispatch = (res) => {
        expect(res).to.deep.equal({
          type: SET_NAME,
          name: 'My Cluster'
        });
        setNameSpy();
      };
      const state = () => ({
        connection: { is_favorite: false }
      });
      changeName()(dispatch, state);
      expect(setNameSpy.calledOnce).to.equal(true);
    });
  });
});
