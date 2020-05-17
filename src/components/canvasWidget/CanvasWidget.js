const WidgetCard$ = include('src/components/widgetCard/WidgetCard.js');
const ThreeDimVisualization$ = include(
  'src/components/visualization/threeDimVisualization/ThreeDimVisualization.js'
);
const TwoDimVisualization$ = include(
  'src/components/visualization/twoDimVisualization/TwoDimVisualization.js'
);
const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { not$ } = include('src/libraries/observable/utils.js');
const { Choose$, If$ } = include('src/libraries/observableHtml/utils.js');

// TODO: Remove this one if not still in use
const CanvasWidget$ = ({
  label$,
  surfaces$,
  edges$,
  center$,
  is3d$,
  isEmpty$,
}) => {
  return If$(
    not$(isEmpty$),
    // Height + margin = 5 x navigator buttons
    // Width + margin = 7.5 x navigator buttons
    withShadow(WidgetCard$({ height$: 288, width$: 448 }))(
      Choose$(
        is3d$,
        ThreeDimVisualization$({
          height$: 288,
          width$: 448,
          surfaces$,
          edges$,
          center$,
        }),
        TwoDimVisualization$({
          height$: 288,
          width$: 448,
          surfaces$,
          edges$,
          center$,
        })
      ),
      WidgetLabel$({ label$ })
    ).setStyle({
      position: 'relative',
      color: 'dimgray',
    })
  );
};

module.exports = CanvasWidget$;
