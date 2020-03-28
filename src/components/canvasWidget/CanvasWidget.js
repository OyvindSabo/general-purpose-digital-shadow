const MediumWidgetCard$ = include(
  'src/components/widgetCard/MediumWidgetCard.js'
);
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
    withShadow(MediumWidgetCard$)(
      Choose$(
        is3d$,
        ThreeDimVisualization$({ surfaces$, edges$, center$ }),
        TwoDimVisualization$({ surfaces$, edges$, center$ })
      ),
      WidgetLabel$({ label$ })
    ).setStyle({
      position: 'relative',
      color: 'dimgray',
    })
  );
};

module.exports = CanvasWidget$;
