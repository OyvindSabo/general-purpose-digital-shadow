const Widget = include('src/components/widget/Widget.js');
const { compose, Each, If } = include('src/libraries/simpleHTML/SimpleHTML.js');

const DashboardWidgets = (getProps) => {
  const element = compose('div', { style: 'padding: 10px' }, [
    Each(
      () => getProps().state.widgets,
      (getCurrentValue) => [Widget(getCurrentValue)]
    ),
  ]);

  return element;
};

module.exports = DashboardWidgets;
