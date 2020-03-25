const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue$ = include('src/components/widgetValue/WidgetValue.js');
const SmallWidgetBackgroundContainer$ = include(
  'src/components/smallWidgetBackgroundContainer/SmallWidgetBackgroundContainer.js'
);
const WidgetForegroundContainer$ = include(
  'src/components/widgetForegroundContainer/WidgetForegroundContainer.js'
);

const ValueWidget$ = ({ label$, value$, isEmpty$ }) =>
  If$(
    not$(isEmpty$),
    SmallWidgetBackgroundContainer$(
      WidgetForegroundContainer$(
        WidgetLabel$({ label$ }),
        WidgetValue$({ value$ })
      ).setStyle({ height: '100%', position: 'relative', color: 'dimgray' })
    )
  );

module.exports = ValueWidget$;
