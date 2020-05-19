const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// TODO: Shouldn't there be a label here?
// getProps::() => { surfaces, edges, id3d, center }
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
  const rerender = ({ surfaces, edges, center }) => {
    ctx.clearRect(0, 0, element.width, element.height);
    doRenderVisualization({ surfaces, edges, center, ctx });
  };
  rerender(getProps());
  element.update = () => {
    rerender(getProps());
  };
  return element;
};

module.exports = Canvas2dWidget;
