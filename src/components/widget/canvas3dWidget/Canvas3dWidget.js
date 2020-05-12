const Observable = include('src/libraries/observable/Observable.js');
const Camera = include(
  'src/components/visualization/threeDimVisualization/camera/Camera.js'
);
const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);

const ThreeDimVisualization$ = () => {
  const state = { mouseDown: false };
  const canvasElement = document.createElement('canvas');
  // 16 x SizeUnit
  canvasElement.height = 320;
  // 24 x SizeUnit
  canvasElement.width = 480;
  Object.assign(canvasElement.style, {
    position: 'absolute',
  });
  const camera = new Camera({
    horizontalRotation$: new Observable(0),
    verticalRotation$: new Observable(0),
    distance$: new Observable(100),
    focalLength$: new Observable(100),
  });
  const ctx = canvasElement.getContext('2d');
  const rerender = ({ surfaces, edges, center }) => {
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
  Object.defineProperty(canvasElement, 'widgetDescription', {
    set: ({ surfaces, edges, center }) => {
      Object.assign(canvasElement, {
        _surfaces: surfaces,
        _edges: edges,
        _center: center,
      });
      rerender({ surfaces, edges, center });
    },
  });
  window.addEventListener(camera.horizontalRotation$.id, () =>
    rerender({
      surfaces: canvasElement._surfaces,
      edges: canvasElement._edges,
      center: canvasElement._center,
    })
  );
  window.addEventListener(camera.verticalRotation$.id, () =>
    rerender({
      surfaces: canvasElement._surfaces,
      edges: canvasElement._edges,
      center: canvasElement._center,
    })
  );
  window.addEventListener(camera.distance$.id, () =>
    rerender({
      surfaces: canvasElement._surfaces,
      edges: canvasElement._edges,
      center: canvasElement._center,
    })
  );
  window.addEventListener(camera.focalLength$.id, () =>
    rerender({
      surfaces: canvasElement._surfaces,
      edges: canvasElement._edges,
      center: canvasElement._center,
    })
  );
  return canvasElement;
};

module.exports = ThreeDimVisualization$;
