// Observable

const Observable = include('src/libraries/observable/Observable.js');

// Observable utils

// Observable utils
// Currently needs at least two arguments
const add$ = (...observables) => {
  const sum = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a + b);
  const sum$ = new Observable(sum);
  observables
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const sum = observables
          .map(observable =>
            observable instanceof Observable ? observable.value : observable
          )
          .reduce((a, b) => a + b);
        sum$.value = sum;
      });
    });
  return sum$;
};

// Currently needs at least two arguments
const subtract$ = (...observables) => {
  const difference = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a - b);
  const difference$ = new Observable(difference);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const difference = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a - b);
      difference$.value = difference;
    });
  });
  return difference$;
};

// Currently needs at least two arguments
const multiply$ = (...observables) => {
  const product = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a * b);
  const product$ = new Observable(product);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const product = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a * b);
      product$.value = product;
    });
  });
  return product$;
};

// Currently needs at least two arguments
const divide$ = (...observables) => {
  const quotient = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .reduce((a, b) => a / b);
  const quotient$ = new Observable(quotient);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const quotient = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .reduce((a, b) => a / b);
      quotient$.value = quotient;
    });
  });
  return quotient$;
};

const choose$ = (observable, option1, option2) => {
  const result$ = new Observable(
    (observable instanceof Observable
    ? observable.value
    : observable)
      ? option1 instanceof Observable
        ? option1.value
        : option1
      : option2 instanceof Observable
      ? option2.value
      : option2
  );
  [observable, option1, option2]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        // TODO: Make it possible to set a specific child of an observable
        result$.value = (observable instanceof Observable
        ? observable.value
        : observable)
          ? option1 instanceof Observable
            ? option1.value
            : option1
          : option2 instanceof Observable
          ? option2.value
          : option2;
      });
    });
  return result$;
};

const eq$ = (...observables) => {
  const equality = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .every((element, _, array) => element === array[0]);
  const equality$ = new Observable(equality);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const equality = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .every((element, _, array) => element === array[0]);
      equality$.value = equality;
    });
  });
  return equality$;
};

const and$ = (...observables) => {
  const allTruthy = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .every(Boolean);
  const allTruthy$ = new Observable(allTruthy);
  observables.forEach(observable => {
    window.addEventListener(observable.id, ({ detail }) => {
      const allTruthy = observables
        .map(observable =>
          observable instanceof Observable ? observable.value : observable
        )
        .every(Boolean);
      allTruthy$.value = allTruthy;
    });
  });
  return allTruthy$;
};

const or$ = (...observables) => {
  const someTruthy = observables
    .map(observable =>
      observable instanceof Observable ? observable.value : observable
    )
    .some(Boolean);
  const someTruthy$ = new Observable(someTruthy);
  observables
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const someTruthy = observables
          .map(observable =>
            observable instanceof Observable ? observable.value : observable
          )
          .some(Boolean);
        someTruthy$.value = someTruthy;
      });
    });
  return someTruthy$;
};

const not$ = observable => {
  const conditional =
    observable instanceof Observable ? observable.value : observable;
  const opposite$ = new Observable(!conditional);
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      opposite$.value = !detail;
    });
  }
  return opposite$;
};

const toFixed$ = (number$, decimals$) => {
  const number = number$ instanceof Observable ? number$.value : number$;
  const decimals =
    decimals$ instanceof Observable ? decimals$.value : decimals$;
  const formattedNumber = number.toFixed(decimals);
  const formattedNumber$ = new Observable(formattedNumber);
  [number$, decimals$]
    .filter(observable => observable instanceof Observable)
    .forEach(observable => {
      window.addEventListener(observable.id, ({ detail }) => {
        const number = number$ instanceof Observable ? number$.value : number$;
        const decimals =
          decimals$ instanceof Observable ? decimals$.value : decimals$;
        const formattedNumber = number.toFixed(decimals);
        formattedNumber$.value = formattedNumber;
      });
    });
  return formattedNumber$;
};

// Observable HTML

const createElement$ = (elementType, ...observables) => {
  const element = document.createElement(elementType);
  observables.forEach(observable => {
    if (
      // If it is observable value
      observable instanceof Observable &&
      ['string', 'number'].includes(typeof observable.value)
    ) {
      const textNode = document.createTextNode(observable.value);
      element.appendChild(textNode);
      window.addEventListener(observable.id, ({ detail }) => {
        textNode.nodeValue = detail;
      });
      return;
    }
    if (
      // If it is non-observable value
      ['string', 'number'].includes(typeof observable)
    ) {
      const textNode = document.createTextNode(observable);
      element.appendChild(textNode);
      return;
    }
    // If it is a dom node
    element.appendChild(observable);
  });
  // Note that styleObject$ is an object with observable values, not an observable object
  // TODO: It should also be possible to set the style as a non-observable object
  element.setStyle = styleObject$ => {
    Object.entries(styleObject$).forEach(([styleProperty, styleValue$]) => {
      if (styleValue$ instanceof Observable) {
        element.style[styleProperty] = styleValue$.value;
        window.addEventListener(styleValue$.id, ({ detail }) => {
          element.style[styleProperty] = detail;
        });
        return;
      }
      element.style[styleProperty] = styleValue$;
    });
    return element;
  };
  element.setProps = propsObject => {
    Object.entries(propsObject).forEach(([propKey, propValue$]) => {
      if (propValue$ instanceof Observable) {
        element[propKey] = propValue$.value;
        window.addEventListener(propValue$.id, ({ detail }) => {
          element[propKey] = detail;
        });
        return;
      }
      element[propKey] = propValue$;
    });
    return element;
  };
  element.onClick = clickCallback => {
    element.style.cursor = 'pointer';
    element.onclick = () => clickCallback(element);
    return element;
  };
  element.onMouseEnter = mouseEnterCallback => {
    element.onmouseenter = () => mouseEnterCallback(element);
    return element;
  };
  element.onMouseLeave = mouseLeaveCallback => {
    element.onmouseleave = () => mouseLeaveCallback(element);
    return element;
  };
  element.onInput = inputCallback => {
    element.oninput = () => inputCallback(element);
    return element;
  };
  element.onChange = changeCallback => {
    element.onchange = () => changeCallback(element);
    return element;
  };
  return element;
};
const div$ = (...children) => createElement$('div', ...children);
const h1$ = (...children) => createElement$('h1', ...children);
const textArea$ = (value = '') =>
  createElement$('textarea').setProps({ value });
const br$ = () => createElement('br');
const select$ = (...children) => createElement$('select', ...children);
const button$ = (...children) => createElement$('button', ...children);
const option$ = ({ value, label }) =>
  createElement$('option', label).setProps({ value });
const input$ = (value = '') => createElement$('input').setProps({ value });
const canvas$ = ({ width, height }) => {
  const element = createElement('canvas');
  element.width = width;
  element.height = height;
  return element;
};

// Observable HTML util components

const Choose$ = (observable, element1, element2) => {
  let element = (observable instanceof Observable
  ? observable.value
  : observable)
    ? element1
    : element2;
  if (observable instanceof Observable) {
    window.addEventListener(observable.id, ({ detail }) => {
      // TODO: Make it possible to set a specific child of an observable
      newElement = (observable instanceof Observable
      ? observable.value
      : observable)
        ? element1
        : element2;

      if (newElement !== element) {
        element.parentNode.replaceChild(newElement, element);
        element = newElement;
      }
    });
  }
  return element;
};

const Switch$ = (statement$, ...clauses) => {
  const cases = clauses.filter((_, i) => i % 2 === 0);
  const elements = clauses.filter((_, i) => i % 2 !== 0);
  return div$(
    ...cases.map((theCase, i) => {
      const element = elements[i];
      // Warning: Assumes that display is not initially dynamic
      const display = element.style.display;
      return element.setStyle({
        display: choose$(eq$(statement$, theCase), display, 'none'),
      });
    })
  );
};

const Nothing$ = () => div$().setStyle({ display: 'none' });

const If$ = (observable, element) => Choose$(observable, element, Nothing$());

// Router

const Router = include('src/libraries/router/Router.js');

// Utils
const handleText = textOrNode =>
  typeof textOrNode === 'string'
    ? document.createTextNode(textOrNode)
    : textOrNode;

const appendChild = (element, child) => {
  if (!child) return;
  element.appendChild(child);
};

const createElement = (elementType, ...children) => {
  const element = document.createElement(elementType);
  children.forEach(child => {
    const childNode = handleText(child);
    appendChild(element, childNode);
  });
  element._defaultUpdate = () =>
    element.childNodes.forEach(childNode => {
      if (typeof childNode.update !== 'function') return;
      childNode.update();
    });
  element.update = element._defaultUpdate;
  element.setStyle = styleObject => {
    Object.assign(element.style, styleObject);
    return element;
  };
  element.state = {};
  // initState is just like setState, except it does not call element.update
  element.initState = initialState => {
    Object.assign(element.state, initialState);
    return element;
  };
  element.initChildren = (...children) => {
    children.filter(Boolean).forEach(childOrFunction => {
      const child =
        typeof childOrFunction === 'function'
          ? childOrFunction(element)
          : childOrFunction;
      const childNode = handleText(child);
      appendChild(element, childNode);
    });
    return element;
  };
  element.setState = newState => {
    Object.assign(element.state, newState);
    element.update();
  };
  element.onUpdate = updateCallback => {
    element.update = () => {
      updateCallback(element);
      element._defaultUpdate();
    };
    return element;
  };
  element.onInput = inputCallback => {
    element.oninput = event => inputCallback(element, event);
    return element;
  };
  element.onMouseEnter = mouseEnterCallback => {
    element.onmouseenter = () => mouseEnterCallback(element);
    return element;
  };
  element.onMouseLeave = mouseLeaveCallback => {
    element.onmouseleave = () => mouseLeaveCallback(element);
    return element;
  };
  element.onClick = clickCallback => {
    element.onclick = () => clickCallback(element);
    return element;
  };
  return element;
};

const div = (...children) => createElement('div', ...children);
const input = (...children) => createElement('input', ...children);
const textArea = (...children) => createElement('textarea', ...children);
const button = (...children) => createElement('button', ...children);

// Might not need this
const propsHaveChanged = (previousProps, newProps) => {
  for (key of Object.keys(previousProps)) {
    if (previousProps[key] !== newProps[key]) {
      return true;
    }
  }
  false;
};

// functionalComponent returns one node
const Replaceable = functionalComponent =>
  div(functionalComponent()).onUpdate(element => {
    // TODO: Somehow make this not have to update if it doesn't have to
    // TODO: Accept that functionalComponent returns an array of hildren
    element.innerHTML = '';
    appendChild(element, functionalComponent());
  });

// functionalComponent returns an array of nodes
const Replaceables = functionalComponent =>
  div(...functionalComponent())
    .setStyle({ display: 'inline-block' })
    .onUpdate(element => {
      // TODO: Somehow make this not have to update if it doesn't have to
      // TODO: Accept that functionalComponent returns an array of hildren
      element.innerHTML = '';
      functionalComponent().forEach(child => appendChild(element, child));
    });

const If = (fnCondition, fnThenComponent, fnElseComponent = () => null) => {
  const condition = fnCondition();
  return div(condition ? fnThenComponent() : fnElseComponent())
    .initState({ condition })
    .onUpdate(element => {
      const newCondition = fnCondition();
      if (newCondition === element.state.condition) return;
      element.setState({ condition: newCondition });
      element.innerHTML = '';
      appendChild(
        element,
        fnCondition()
          ? handleText(fnThenComponent())
          : handleText(fnElseComponent())
      );
    });
};

const Styled = (component, style) => (...children) =>
  component(...children).setStyle(style);

// Components
const TopNavigator$ = () => div$().setStyle({ height: '40px' });

const LeftNavigatorButton = ({ icon, label, route, isActive$ }) => {
  const Button = (...children) =>
    div$(...children).setStyle({
      height: '80px',
      width: '80px',
      overflow: 'hidden',
      transition: '0.5s',
      cursor: 'pointer',
    });
  const Icon = (...children) =>
    div$(...children).setStyle({
      fontSize: '30px',
      textAlign: 'center',
      marginTop: '15px',
      pointerEvents: 'none',
      userSelect: 'none',
    });
  const Label = (...children) =>
    div$(...children).setStyle({
      fontSize: '15px',
      textAlign: 'center',
      pointerEvents: 'none',
      userSelect: 'none',
    });
  return Button(Icon(icon), Label(label))
    .setStyle({
      background: choose$(isActive$, 'whitesmoke', 'initial'),
      color: choose$(isActive$, 'dimgray', 'gray'),
    })
    .onMouseEnter(element => {
      element.setStyle({
        background: 'whitesmoke',
        color: 'dimgray',
      });
    })
    .onMouseLeave(element => {
      element.setStyle({
        background: choose$(isActive$, 'whitesmoke', 'initial'),
        color: choose$(isActive$, 'dimgray', 'gray'),
      });
    })
    .onClick(() => (location.hash = `#!${route}`));
};

const LeftNavigator$ = (...children) =>
  div$(...children).setStyle({
    height: '100%',
    width: '80px',
    borderRadius: '10px 0 0 0',
    borderRight: '1px solid LightGray',
    overflow: 'hidden',
    background: 'White',
    position: 'absolute',
  });

const ViewContainer$ = (...children) =>
  div$(...children).setStyle({
    position: 'absolute',
    top: '0',
    left: '80px',
    right: '0',
  });

const MainContainer$ = (...children) =>
  div$(...children).setStyle({
    height: 'calc(100% - 40px)',
    borderRadius: '10px 10px 0 0',
    background: 'GhostWhite',
    position: 'absolute',
    left: '0',
    right: '0',
  });

const HomeView$ = () => div$('HomeView');
const DataSourcesView$ = () => div$('DataSourcesView');
const AnalyticsView$ = () => div$('AnalyticsView');
const AlertsView$ = () => div$('AlertsView');

// Components
const ValuesViewTopNavigator$ = (...children) =>
  div$(...children).setStyle({ width: '100%', height: '80px' });

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

const WidgetInnerContainer$ = (...children) => {
  return div$(...children).setStyle({
    width: '100%',
    height: '100%',
    display: 'flex',
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
        LeftNavigatorButton({
          icon: '🏗',
          label: 'Data sources',
          route: '/data-sources',
          isActive$: eq$(currentRoute$, '/data-sources'),
        }),
        LeftNavigatorButton({
          icon: '🧮',
          label: 'Values',
          route: '/values',
          isActive$: or$(
            eq$(currentRoute$, '/values'),
            eq$(currentRoute$, '/values/edit')
          ),
        }),
        LeftNavigatorButton({
          icon: '📊',
          label: 'Dashboards',
          route: '/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/dashboards'),
            eq$(currentRoute$, '/dashboards/edit')
          ),
        }),
        LeftNavigatorButton({
          icon: '⏰',
          label: 'Alerts',
          route: '/alerts',
          isActive$: eq$(currentRoute$, '/alerts'),
        })
      ),
      // Not sure I'm happy about this solution
      ViewContainer$(
        If$(eq$(currentRoute$, '/'), HomeView$()),
        If$(eq$(currentRoute$, '/data-sources'), DataSourcesView$()),
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
        If$(eq$(currentRoute$, '/alerts'), AlertsView$()),
        If$(
          eq$(currentRoute$, '/analytics/<analyticId:string>'),
          AnalyticsView$()
        )
      )
    )
  );

  return element;
};

module.exports = App;
