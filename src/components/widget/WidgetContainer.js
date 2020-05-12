const Container = include('src/libraries/simpleUI/Container.js');

const WidgetContainer = () => {
  const widgetContainer = Container();
  Object.assign(widgetContainer.style, {
    display: 'inline-block',
    verticalAlign: 'top',
    background: 'white',
  });
  return widgetContainer;
};

module.exports = WidgetContainer;
