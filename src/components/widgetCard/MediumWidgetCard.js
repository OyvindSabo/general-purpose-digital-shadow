const WidgetCard$ = include('src/components/widgetCard/WidgetCard.js');

const MediumWidgetCard$ = WidgetCard$({ height$: 320, width$: 480 });

module.exports = MediumWidgetCard$;
