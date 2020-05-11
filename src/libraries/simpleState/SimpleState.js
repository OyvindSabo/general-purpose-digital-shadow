const SimpleState = (initialState) => {
  const state = initialState;
  const changeListeners = [];
  const notifyChangeListeners = () => {
    changeListeners.forEach((changeListener) => changeListener(state));
  };
  const setState = (newState) => {
    Object.assign(state, newState);
    notifyChangeListeners;
  };
  const addStateChangeListener = (callback) => changeListeners.push(callback);

  return {
    state,
    setState,
    addStateChangeListener,
  };
};

module.exports = SimpleState;
