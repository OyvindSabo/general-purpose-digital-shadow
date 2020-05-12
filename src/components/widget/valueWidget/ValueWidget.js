const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue$ = include('src/components/widgetValue/WidgetValue.js');
const Observable = include('src/libraries/observable/Observable.js');
const Container = include('src/libraries/simpleUI/Container.js');

const ValueWidget = () => {
  const valueContainer = Container();
  Object.assign(valueContainer.style, {
    position: 'relative',
    color: 'dimgray',
    // 24 x SizeUnit
    width: '480px',
    // 16 x SizeUnit
    height: '320px',
  });
  const label$ = new Observable('');
  const value$ = new Observable('');

  Object.defineProperty(valueContainer, 'widgetDescription', {
    set: ({ label, value }) => {
      label$.value = label;
      value$.value = value;
    },
  });

  valueContainer.children = [
    WidgetLabel$({ label$ }),
    WidgetValue$({ value$ }),
  ];
  return valueContainer;
};

module.exports = ValueWidget;
