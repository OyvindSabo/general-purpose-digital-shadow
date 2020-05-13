const WidgetContainer = include('src/components/widget/WidgetContainer.js');
const Canvas3dWidget = include(
  'src/components/widget/canvas3dWidget/Canvas3dWidget.js'
);
const Canvas2dWidget = include(
  'src/components/widget/canvas2dWidget/Canvas2dWidget.js'
);
const ValueWidget = include('src/components/widget/valueWidget/ValueWidget.js');
const { defineComponent, span } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const Widget = defineComponent((props) => {
  const { type, is3d } = props;
  return span(
    {
      style: {
        display: 'inline-block',
        verticalAlign: 'top',
        background: 'white', // 24 x SizeUnit
        width: '480px',
        // 16 x SizeUnit
        height: '320px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0 0 10px -5px',
      },
    },
    ...[
      type === 'canvas-widget' && is3d ? Canvas3dWidget(props) : null,
      type === 'canvas-widget' && !is3d ? Canvas2dWidget(props) : null,
      type === 'value-widget' ? ValueWidget(props) : null,
    ].filter(Boolean)
  );
});

module.exports = Widget;
