// Observable

const Observable = include('src/libraries/observable/Observable.js');
const { eq$, choose$, or$, not$, toFixed$ } = include(
  'src/libraries/observable/utils.js'
);
const { div$, textArea$, canvas$ } = include(
  'src/libraries/observableHtml/ObservableHtml.js'
);
const { If$, Choose$ } = include('src/libraries/observableHtml/utils.js');

const TopNavigator$ = include('src/components/topNavigator/TopNavigator.js');
const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const LeftNavigator$ = include('src/components/leftNavigator/LeftNavigator.js');
const ViewContainer$ = include('src/components/viewContainer/ViewContainer.js');
const MainContainer$ = include('src/components/mainContainer/MainContainer.js');
const Home$ = include('src/views/home/Home.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const AlertsView$ = () => div$('AlertsView');

const ExpandCodeEditorButton$ = ({ icon, label$, isOpen$ }) => {
  const isHovered$ = new Observable(false);
  return div$(
    div$(choose$(isOpen$, '−', '+')).setStyle({
      fontSize: '30px',
      textAlign: 'center',
      marginTop: '15px',
      pointerEvents: 'none',
      userSelect: 'none',
      transform: choose$(isOpen$, 'rotate(180deg)', 'rotate(0deg)'),
      transition: '0.5s',
    })
  )
    .setStyle({
      position: 'absolute',
      background: choose$(isHovered$, 'dodgerblue', 'royalblue'),
      borderRadius: '50%',
      color: 'white',
      height: '60px',
      width: '60px',
      margin: '10px',
      overflow: 'hidden',
      transition: '0.5s',
      cursor: 'pointer',
      zIndex: '1',
    })
    .onMouseEnter(element => {
      isHovered$.value = true;
    })
    .onMouseLeave(element => {
      isHovered$.value = false;
    });
};

const CodeEditor$ = value$ => {
  return textArea$(value$).setStyle({
    width: '100%',
    height: 'calc(100vh - 40px)',
    padding: '20px',
    background: 'black',
    color: 'white',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '14px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
  });
};

const SmallWidgetBackgroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    padding: '20px',
    width: '360px',
    height: '240px',
    display: 'inline-block',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  });
};

const MediumWidgetBackgroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    padding: '20px',
    width: '480px',
    height: '320px',
    display: 'inline-block',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  });
};

const WidgetForegroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    height: '100%',
    border: '1px solid LightGray',
    boxSizing: 'border-box',
    background: 'White',
  });
};

const ValueWidgetLabel$ = ({ label$ }) =>
  div$(label$).setStyle({
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  });

const ValueWidgetValue$ = ({ value$ }) =>
  div$(toFixed$(value$, 2)).setStyle({
    fontSize: '60px',
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  });

const ValueWidget$ = ({ label$, value$, isEmpty$ }) =>
  If$(
    not$(isEmpty$),
    SmallWidgetBackgroundContainer$(
      WidgetForegroundContainer$(
        ValueWidgetLabel$({ label$ }),
        ValueWidgetValue$({ value$ })
      ).setStyle({ height: '100%', position: 'relative', color: 'dimgray' })
    )
  );

const ValuesView$ = ({ state, currentRoute$ }) => {
  const codeEditorIsOpen$ = eq$(currentRoute$, '/values/edit');
  return div$(
    ExpandCodeEditorButton$({
      icon: '{}',
      label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
      isOpen$: codeEditorIsOpen$,
    }).onClick(() => {
      location.hash = codeEditorIsOpen$.value ? '#!/values' : '#!/values/edit';
    }),
    div$(
      CodeEditor$(state.derivedValuesCode$)
        .onInput(({ value }) => {
          state.derivedValuesCode$.value = value;
        })
        .setStyle({ paddingLeft: '80px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...state.derivedValues.map(({ label$, value$, isEmpty$ }) =>
          ValueWidget$({ label$, value$, isEmpty$ })
        )
      ).setStyle({ position: 'relative', top: '0' })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', '80px'),
      transition: '0.5s',
    })
  ).setStyle({ width: '100%' });
};

const rotate = ([x, y, z], rx, ry) => {
  const theta = rx;
  const phi = ry;

  const horizontallyRotatedVertex = [
    x * Math.cos(theta) + z * Math.sin(theta),
    y,
    z * Math.cos(theta) - x * Math.sin(theta),
  ];

  return [
    horizontallyRotatedVertex[0],
    horizontallyRotatedVertex[1] * Math.cos(phi) -
      horizontallyRotatedVertex[2] * Math.sin(phi),
    horizontallyRotatedVertex[1] * Math.sin(phi) +
      horizontallyRotatedVertex[2] * Math.cos(phi),
  ];
};

const toCenterOfStructure = ([x, y, z], transformedCenterOfStructure) => [
  x - transformedCenterOfStructure[0],
  y - transformedCenterOfStructure[1],
  z - transformedCenterOfStructure[2],
];

const toCenterOfWidget = ([x, y, z], ctx) => [
  x + ctx.canvas.width / 2,
  y - ctx.canvas.height / 2,
  z,
];

const toPerspective = ([x, y, z], d, focalLength) =>
  focalLength
    ? [
        x * (focalLength / (d + focalLength + z)),
        y * (focalLength / (d + focalLength + z)),
        z,
      ]
    : [x, y, z];

/**
 * @param {number} dx
 * Defines the x coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} dy
 * Defines the y coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} dz
 * Defines the z coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} d
 * Defines the distance from the defined center of the structure, to the
 * camera.
 */
const render = (
  surfaces$,
  edges$,
  ctx,
  center,
  rx = 0,
  ry = 0,
  d = 0,
  focalLength = 0
) => {
  // Render the faces
  surfaces$.value.forEach(({ color, points }) => {
    points
      .map(point => toCenterOfStructure(point, center))
      .map(point => rotate(point, rx, ry))
      .map(point => toPerspective(point, d, focalLength))
      .map(point => toCenterOfWidget(point, ctx))
      .forEach((point, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(point[0], -point[1]);
          return;
        }
        if (index < points.length - 1) {
          ctx.lineTo(point[0], -point[1]);
          return;
        }
        if (index === points.length - 1) {
          ctx.lineTo(point[0], -point[1]);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
          return;
        }
      });
  });

  // Render the edges
  edges$.value.forEach(({ color, points, width }) => {
    // Draw the first vertex
    const startPoint = toCenterOfWidget(
      toPerspective(
        rotate(toCenterOfStructure(points[0], center), rx, ry),
        d,
        focalLength
      ),

      ctx
    );
    const endPoint = toCenterOfWidget(
      toPerspective(
        rotate(toCenterOfStructure(points[1], center), rx, ry),
        d,
        focalLength
      ),
      ctx
    );
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(startPoint[0], -startPoint[1]);
    ctx.lineTo(endPoint[0], -endPoint[1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  });
};

const Camera = function({
  target = new Observable([0, 0, 0]),
  horizontalRotation$ = new Observable(0),
  verticalRotation$ = new Observable(0),
  distance$ = new Observabe(100),
  focalLength$ = new Observable(100),
}) {
  this.target = target;
  this.horizontalRotation$ = horizontalRotation$;
  this.verticalRotation$ = new Observable(
    Math.max(Math.min(verticalRotation$.value, Math.PI / 4), -Math.PI / 2)
  );
  this.distance$ = new Observable(
    Math.max(distance$.value, -focalLength$.value / 2)
  );
  this.focalLength$ = focalLength$;
  this.setDistance = distance => {
    this.distance$.value = Math.max(distance, -focalLength$.value / 2);
  };
  this.setVerticalRotation = verticalRotation => {
    this.verticalRotation$.value = Math.max(
      Math.min(verticalRotation, Math.PI / 2),
      -Math.PI / 2
    );
  };
};

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

const ThreeDimVisualization$ = ({ surfaces$, edges$, center$ }) => {
  const state = { mouseDown: false };
  const canvas = canvas$({ height: 280, width: 440 }).setStyle({
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
  canvas.onwheel = event => {
    camera.setDistance(camera.distance$.value + event.deltaY / 5);
  };
  window.addEventListener('mousedown', event => {
    state.mouseDown = true;
  });
  window.addEventListener(
    'mouseup',
    (canvas.onmouseup = event => {
      state.mouseDown = false;
    })
  );
  canvas.onmousemove = event => {
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

const CanvasWidget$ = ({
  label$,
  surfaces$,
  edges$,
  center$,
  is3d$,
  isEmpty$,
}) => {
  return If$(
    not$(isEmpty$),
    MediumWidgetBackgroundContainer$(
      WidgetForegroundContainer$(
        Choose$(
          is3d$,
          ThreeDimVisualization$({ surfaces$, edges$, center$ }),
          TwoDimVisualization$({ surfaces$, edges$, center$ })
        ),
        ValueWidgetLabel$({ label$ })
      ).setStyle({
        height: '100%',
        position: 'relative',
        color: 'dimgray',
      })
    )
  );
};

const DashboardsView$ = ({ state, currentRoute$ }) => {
  const codeEditorIsOpen$ = eq$(currentRoute$, '/dashboards/edit');
  return div$(
    ExpandCodeEditorButton$({
      icon: '+',
      label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
      isOpen$: codeEditorIsOpen$,
    }).onClick(() => {
      location.hash = codeEditorIsOpen$.value
        ? '#!/dashboards'
        : '#!/dashboards/edit';
    }),
    div$(
      CodeEditor$(state.widgetsCode$)
        .onInput(({ value }) => {
          state.widgetsCode$.value = value;
        })
        .setStyle({ paddingLeft: '80px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...state.widgets.map(
          ({ label$, surfaces$, edges$, is3d$, center$, isEmpty$ }) =>
            CanvasWidget$({
              label$,
              surfaces$,
              edges$,
              is3d$,
              center$,
              isEmpty$,
            })
        )
      ).setStyle({ position: 'relative', top: '0' })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', '80px'),
      transition: '0.5s',
    })
  ).setStyle({ width: '100%' });
};

const App = ({ params, currentRoute$, state }) => {
  const element = div$(
    TopNavigator$(),
    MainContainer$(
      LeftNavigator$(
        // Add something for home as well
        LeftNavigatorButton$({
          icon: '🏗',
          label: 'Data sources',
          route: '/data-sources',
          isActive$: eq$(currentRoute$, '/data-sources'),
        }),
        LeftNavigatorButton$({
          icon: '🧮',
          label: 'Values',
          route: '/values',
          isActive$: or$(
            eq$(currentRoute$, '/values'),
            eq$(currentRoute$, '/values/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '📊',
          label: 'Dashboards',
          route: '/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/dashboards'),
            eq$(currentRoute$, '/dashboards/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '⏰',
          label: 'Alerts',
          route: '/alerts',
          isActive$: eq$(currentRoute$, '/alerts'),
        })
      ),
      // Not sure I'm happy about this solution
      ViewContainer$(
        If$(eq$(currentRoute$, '/'), Home$()),
        If$(eq$(currentRoute$, '/data-sources'), DataSources$()),
        If$(
          or$(
            eq$(currentRoute$, '/values'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/values/edit'),
            eq$(currentRoute$, '/values')
          ),
          ValuesView$({ state, currentRoute$ })
        ),
        If$(
          or$(
            eq$(currentRoute$, '/dashboards'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/dashboards/edit'),
            eq$(currentRoute$, '/dashboards')
          ),
          DashboardsView$({ state, currentRoute$ })
        ),
        If$(eq$(currentRoute$, '/alerts'), AlertsView$())
      )
    )
  );

  return element;
};

module.exports = App;
