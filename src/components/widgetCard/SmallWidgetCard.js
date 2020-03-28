const WidgetCard$ = include('src/components/widgetCard/WidgetCard.js');

const SmallWidgetCard$ = WidgetCard$({ height$: 240, width$: 360 });

module.exports = SmallWidgetCard$;
