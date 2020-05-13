const { defineComponent } = include('src/libraries/simpleHTML/SimpleHTML.js');

const simpleState = (initialState) => {
  const state = initialState;
  const connectedElements = [];
  const emit = () => {
    connectedElements.forEach((connectedElement) => {
      console.log('connectedElement: ', connectedElement);
      connectedElement.update({ state, setState });
    });
  };
  const setState = (newState) => {
    Object.assign(state, newState);
    emit();
  };
  const withState = (elementFunction) => {
    const element = defineComponent(elementFunction)({ state, setState });
    connectedElements.push(element);
    return element;
  };
  return {
    state,
    setState,
    withState,
  };
};

module.exports = simpleState;
