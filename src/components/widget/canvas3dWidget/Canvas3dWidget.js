const Observable = include('src/libraries/observable/Observable.js');
const Camera = include(
  'src/components/visualization/threeDimVisualization/camera/Camera.js'
);
const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// TODO: Shouldn't there be a label here?
const Canvas3dWidget = (getProps) => {
  const { surfaces, edges, center } = getProps();
  const state = { mouseDown: false };
  const canvasElement = compose(
    'canvas',
    () => ({
      height: 320, // 16 x SizeUnit
      width: 480, // 24 x SizeUnit
      style: { position: 'absolute' },
    }),
    []
  );
  const camera = new Camera({
    horizontalRotation$: new Observable(0),
    verticalRotation$: new Observable(0),
    distance$: new Observable(100),
    focalLength$: new Observable(100),
  });
  const ctx = canvasElement.getContext('2d');
  const rerender = () => {
    const { surfaces, edges, center } = getProps();
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    doRenderVisualization({
      surfaces,
      edges,
      ctx,
      center,
      rx: camera.horizontalRotation$.value,
      ry: camera.verticalRotation$.value,
      d: camera.distance$.value,
      focalLength: camera.focalLength$.value,
    });
  };
  rerender();
  canvasElement.onwheel = (event) => {
    camera.setDistance(camera.distance$.value + event.deltaY / 5);
  };
  window.addEventListener('mousedown', (event) => {
    state.mouseDown = true;
  });
  window.addEventListener(
    'mouseup',
    (canvasElement.onmouseup = (event) => {
      state.mouseDown = false;
    })
  );
  canvasElement.onmousemove = (event) => {
    if (state.mouseDown) {
      camera.horizontalRotation$.value =
        camera.horizontalRotation$.value - event.movementX / 100;
      camera.setVerticalRotation(
        camera.verticalRotation$.value - event.movementY / 100
      );
    }
  };
  canvasElement.update = () => {
    rerender(getProps());
  };
  window.addEventListener(camera.horizontalRotation$.id, () => {
    rerender({ surfaces, edges, center });
  });
  window.addEventListener(camera.verticalRotation$.id, () => {
    rerender({ surfaces, edges, center });
  });
  window.addEventListener(camera.distance$.id, () => {
    rerender({ surfaces, edges, center });
  });
  window.addEventListener(camera.focalLength$.id, () => {
    rerender({ surfaces, edges, center });
  });
  return canvasElement;
};

module.exports = Canvas3dWidget;
