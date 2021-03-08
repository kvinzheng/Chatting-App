import store from './store';

describe('test store', () => {
  it('expect store is a function', () => {
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('replaceReducer');
  });
});
