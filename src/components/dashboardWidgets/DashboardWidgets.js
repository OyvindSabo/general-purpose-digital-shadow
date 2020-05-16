const Widget = include('src/components/widget/Widget.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const getWidgetElements = ({ widgets }) => {
  return widgets.map(
    ({ type, label, value, surfaces, edges, is3d, center }) => {
      return Widget(() => ({
        type,
        label,
        value,
        surfaces,
        edges,
        is3d,
        center,
      }));
    }
  );
};

// getProps::() => { state, viewModel }
const DashboardWidgets = (getProps) => {
  const element = compose(
    'div',
    () => ({ style: { padding: '10px' } }),
    getWidgetElements({ widgets: getProps().state.widgets })
  );
  element.update = () => {
    const { state } = getProps();
    if (state.widgets.length !== element.childElementCount) {
      doPatchChildren(
        element,
        getWidgetElements({ widgets: getProps().state.widgets })
      );
    } else {
      Array.from(element.childNodes).forEach((childNode) => {
        childNode.update();
      });
    }
  };
  return element;
};

module.exports = DashboardWidgets;
