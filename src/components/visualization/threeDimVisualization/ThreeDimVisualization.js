const Observable = include('src/libraries/observable/Observable.js');
const { canvas$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Camera = include(
  'src/components/visualization/threeDimVisualization/camera/Camera.js'
);
const render = include('src/components/visualization/render/render.js');

const ThreeDimVisualization$ = ({
  height$,
  width$,
  surfaces$,
  edges$,
  center$,
}) => {
  const state = { mouseDown: false };
  const canvas = canvas$({ height$, width$ }).setStyle({
    position: 'absolute',
  });
  const camera = new Camera({
    target: center$,
    horizontalRotation$: new Observable(0),
    verticalRotation$: new Observable(0),
    distance$: new Observable(100),
    focalLength$: new Observable(100),
  });
  const ctx = canvas.getContext('2d');
  const rerender = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render(
      surfaces$,
      edges$,
      ctx,
      camera.target.value,
      camera.horizontalRotation$.value,
      camera.verticalRotation$.value,
      camera.distance$.value,
      camera.focalLength$.value
    );
  };
  rerender();
  canvas.onwheel = (event) => {
    camera.setDistance(camera.distance$.value + event.deltaY / 5);
  };
  window.addEventListener('mousedown', (event) => {
    state.mouseDown = true;
  });
  window.addEventListener(
    'mouseup',
    (canvas.onmouseup = (event) => {
      state.mouseDown = false;
    })
  );
  canvas.onmousemove = (event) => {
    if (state.mouseDown) {
      camera.horizontalRotation$.value =
        camera.horizontalRotation$.value - event.movementX / 100;
      camera.setVerticalRotation(
        camera.verticalRotation$.value - event.movementY / 100
      );
    }
  };
  window.addEventListener(camera.horizontalRotation$.id, () => rerender());
  window.addEventListener(camera.verticalRotation$.id, () => rerender());
  window.addEventListener(camera.distance$.id, () => rerender());
  window.addEventListener(camera.focalLength$.id, () => rerender());
  window.addEventListener(surfaces$.id, () => rerender());
  window.addEventListener(edges$.id, () => rerender());
  window.addEventListener(center$.id, () => rerender());
  return canvas;
};

module.exports = ThreeDimVisualization$;
