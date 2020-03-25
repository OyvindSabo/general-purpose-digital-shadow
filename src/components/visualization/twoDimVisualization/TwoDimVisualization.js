const { canvas$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const render = include('src/components/visualization/render/render.js');

const TwoDimVisualization$ = ({ surfaces$, edges$, center$ }) => {
  const canvas = canvas$({ height: 280, width: 440 }).setStyle({
    position: 'absolute',
  });
  const ctx = canvas.getContext('2d');
  const rerender = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(surfaces$, edges$, ctx, center$.value);
  };
  rerender();
  window.addEventListener(surfaces$.id, () => rerender());
  window.addEventListener(edges$.id, () => rerender());
  window.addEventListener(center$.id, () => rerender());
  return canvas;
};

module.exports = TwoDimVisualization$;
