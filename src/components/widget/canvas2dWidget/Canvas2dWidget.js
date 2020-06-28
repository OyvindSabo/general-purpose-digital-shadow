const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);
const WidgetLabel = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue = include('src/components/widgetValue/WidgetValue.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// TODO: Shouldn't there be a label here?
// getProps::() => { surfaces, lines, id3d, center }
const Canvas2dWidget = (getProps) => {
  const element = compose(
    'canvas',
    () => ({
      height: 320, // 16 x SizeUnit
      width: 480, // 24 x SizeUnit
      style: 'position: absolute;',
    }),
    []
  );
  const ctx = element.getContext('2d');
  const rerender = () => {
    console.log('Rerendering 2D widget');
    const { surfaces, lines, center } = getProps();
    ctx.clearRect(0, 0, element.width, element.height);
    doRenderVisualization({ surfaces, lines, center, ctx });
  };
  rerender();
  element.update = () => {
    rerender();
  };
  return compose(
    'span',
    () => ({
      // width = 24 x 20px
      // height = 16 x 20px
      style: `display: inline-block;
              position: relative;
              color: dimgray;
              width: 480px;
              height: 320px;`,
    }),
    [
      WidgetLabel(() => ({ label: getProps().label })),
      WidgetValue(() => ({ value: getProps().value })),
      element,
    ]
  );
};

module.exports = Canvas2dWidget;
