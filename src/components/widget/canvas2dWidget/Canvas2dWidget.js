const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);

const TwoDimVisualization$ = ({
  type,
  label,
  value,
  surfaces,
  edges,
  is3d,
  center,
}) => {
  const canvasElement = document.createElement('canvas');
  Object.assign(canvasElement, {
    // 16 x SizeUnit
    height: 320,
    // 24 x SizeUnit
    width: 480,
  });
  canvasElement.style.position = 'absolute';
  const ctx = canvasElement.getContext('2d');
  const rerender = ({ surfaces, edges, center }) => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    doRenderVisualization({ surfaces, edges, center, ctx });
  };
  canvasElement.update = ({ surfaces, edges, center }) => {
    rerender({ surfaces, edges, center });
  };
  return canvasElement;
};

module.exports = TwoDimVisualization$;
