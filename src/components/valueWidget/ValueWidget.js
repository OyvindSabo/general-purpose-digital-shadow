const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue$ = include('src/components/widgetValue/WidgetValue.js');
const WidgetCard$ = include('src/components/widgetCard/WidgetCard.js');
const { not$ } = include('src/libraries/observable/utils.js');
const { If$ } = include('src/libraries/observableHtml/utils.js');
const withShadow = include('src/styleWrappers/withShadow.js');

const ValueWidget$ = ({ label$, value$ }) => {
  If$(
    not$(isEmpty$),
    // Height + margin = 5 x navigator buttons
    // Width + margin = 7.5 x navigator buttons
    withShadow(WidgetCard$({ height$: 288, width$: 448 }))(
      WidgetLabel$({ label$ }),
      WidgetValue$({ value$ })
    ).setStyle({ position: 'relative', color: 'dimgray' })
  );
};

module.exports = ValueWidget$;
