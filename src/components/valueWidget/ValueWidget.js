const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue$ = include('src/components/widgetValue/WidgetValue.js');
const SmallWidgetCard$ = include(
  'src/components/widgetCard/SmallWidgetCard.js'
);
const { not$ } = include('src/libraries/observable/utils.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');
const withShadow = include('src/styleWrappers/withShadow.js');

const ValueWidget$ = ({ label$, value$, isEmpty$ }) =>
  If$(
    not$(isEmpty$),
    withShadow(SmallWidgetCard$)(
      WidgetLabel$({ label$ }),
      WidgetValue$({ value$ })
    ).setStyle({ position: 'relative', color: 'dimgray' })
  );

module.exports = ValueWidget$;
