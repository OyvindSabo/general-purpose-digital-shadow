const Observable = include('src/libraries/observable/Observable.js');
const Camera = include(
  'src/components/visualization/threeDimVisualization/camera/Camera.js'
);
const doRenderVisualization = include(
  'src/components/widget/doRenderVisualization/doRenderVisualization.js'
);
const WidgetLabel = include('src/components/widgetLabel/WidgetLabel.js');
const WidgetValue = include('src/components/widgetValue/WidgetValue.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// TODO: Shouldn't there be a label here?
const Canvas3dWidget = (getProps) => {
  const { surfaces, lines, center } = getProps();
  const state = { mouseDown: false };
  const element = compose(
    'canvas',
    {
      height: 320, // 16 x 20px
      width: 480, // 24 x 20px
      style: 'position: absolute;',
    },
    []
  );
  const camera = new Camera({
    horizontalRotation$: new Observable(0),
    verticalRotation$: new Observable(0),
    distance$: new Observable(100),
    focalLength$: new Observable(500),
  });
  const ctx = element.getContext('2d');
  const rerender = () => {
    const { surfaces, lines, center } = getProps();
    ctx.clearRect(0, 0, element.width, element.height);
    doRenderVisualization({
      surfaces,
      lines,
      ctx,
      center,
      azimuthAngle: camera.horizontalRotation$.value,
      polarAngle: camera.verticalRotation$.value,
      d: camera.distance$.value,
      focalLength: camera.focalLength$.value,
    });
  };
  rerender();
  element.onwheel = (event) => {
    camera.setDistance(camera.distance$.value + event.deltaY / 5);
  };
  window.addEventListener('mousedown', (event) => {
    state.mouseDown = true;
  });
  window.addEventListener(
    'mouseup',
    (element.onmouseup = (event) => {
      state.mouseDown = false;
    })
  );
  element.onmousemove = (event) => {
    if (state.mouseDown) {
      camera.horizontalRotation$.value =
        camera.horizontalRotation$.value - event.movementX / 100;
      camera.setVerticalRotation(
        camera.verticalRotation$.value - event.movementY / 100
      );
    }
  };
  element.update = () => {
    rerender();
  };
  window.addEventListener(camera.horizontalRotation$.id, () => {
    rerender({ surfaces, lines, center });
  });
  window.addEventListener(camera.verticalRotation$.id, () => {
    rerender({ surfaces, lines, center });
  });
  window.addEventListener(camera.distance$.id, () => {
    rerender({ surfaces, lines, center });
  });
  window.addEventListener(camera.focalLength$.id, () => {
    rerender({ surfaces, lines, center });
  });
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

module.exports = Canvas3dWidget;
