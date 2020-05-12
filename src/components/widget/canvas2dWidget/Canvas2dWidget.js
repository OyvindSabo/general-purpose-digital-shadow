const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);

const TwoDimVisualization$ = () => {
  const canvasElement = document.createElement('canvas');
  Object.assign(canvasElement.style, {
    position: 'absolute',
    height: '288px',
    width: '448px',
  });
  const ctx = canvasElement.getContext('2d');
  const rerender = ({ surfaces, edges, center }) => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    doRenderVisualization({ surfaces, edges, center, ctx });
  };
  Object.defineProperty(canvasElement, 'widgetDescription', {
    set: ({ surfaces, edges, center }) => {
      console.log('2d widget description: ', surfaces);
      rerender({ surfaces, edges, center });
    },
  });
  return canvasElement;
};

module.exports = TwoDimVisualization$;
