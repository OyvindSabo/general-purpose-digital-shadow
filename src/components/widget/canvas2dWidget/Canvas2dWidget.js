const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// TODO: Shouldn't there be a label here?
const TwoDimVisualization = ({ surfaces, edges, is3d, center }) => {
  const canvasElement = compose(
    'canvas',
    {
      height: 320, // 16 x SizeUnit
      width: 480, // 24 x SizeUnit
      style: { position: 'absolute' },
    },
    []
  );
  const ctx = canvasElement.getContext('2d');
  const rerender = ({ surfaces, edges, center }) => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    doRenderVisualization({ surfaces, edges, center, ctx });
  };
  rerender({ surfaces, edges, center });
  canvasElement.update = ({ surfaces, edges, center }) => {
    rerender({ surfaces, edges, center });
  };
  return canvasElement;
};

module.exports = TwoDimVisualization;
