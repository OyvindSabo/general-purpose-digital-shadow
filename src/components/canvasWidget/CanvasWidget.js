const MediumWidgetBackgroundContainer$ = include(
  'src/components/mediumWidgetBackgroundContainer/MediumWidgetBackgroundContainer.js'
);
const WidgetForegroundContainer$ = include(
  'src/components/widgetForegroundContainer/WidgetForegroundContainer.js'
);
const ThreeDimVisualization$ = include(
  'src/components/visualization/threeDimVisualization/ThreeDimVisualization.js'
);
const TwoDimVisualization$ = include(
  'src/components/visualization/twoDimVisualization/TwoDimVisualization.js'
);
const WidgetLabel$ = include('src/components/widgetLabel/WidgetLabel.js');
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
    MediumWidgetBackgroundContainer$(
      WidgetForegroundContainer$(
        Choose$(
          is3d$,
          ThreeDimVisualization$({ surfaces$, edges$, center$ }),
          TwoDimVisualization$({ surfaces$, edges$, center$ })
        ),
        WidgetLabel$({ label$ })
      ).setStyle({
        height: '100%',
        position: 'relative',
        color: 'dimgray',
      })
    )
  );
};

module.exports = CanvasWidget$;
