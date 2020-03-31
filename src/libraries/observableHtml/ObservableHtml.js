const Observable = include('src/libraries/observable/Observable.js');

const observableToNode$ = observable$ => {
  if (
    // If it is observable value
    observable$ instanceof Observable
  ) {
    if (['string', 'number'].includes(typeof observable$.value)) {
      const textNode = document.createTextNode(observable$.value);
      //textNode.classList.add(observable$.id);
      window.addEventListener(observable$.id, ({ detail }) => {
        textNode.nodeValue = detail;
      });
      return textNode;
    }
    /*if (Array.isArray(observable.value)) {
      const textNode = document.createTextNode(observable.value);
      element.appendChild(textNode);
      window.addEventListener(observable.id, ({ detail }) => {
        textNode.nodeValue = detail;
      });
      return;
    }*/
  }
  if (
    // If it is non-observable value
    ['string', 'number'].includes(typeof observable$)
  ) {
    const textNode = document.createTextNode(observable$);
    return textNode;
  }
  // If it is a dom node
  return observable$;
};

const createElement$ = (elementType, ...observables) => {
  const element = document.createElement(elementType);
  const nodes = observables.map(observableToNode$);
  nodes.forEach(node => element.appendChild(node));

  // Note that styleObject$ is an object with observable values, not an observable object
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
const span$ = (...children) => createElement$('span', ...children);
const h1$ = (...children) => createElement$('h1', ...children);
const textArea$ = (value = '') =>
  createElement$('textarea').setProps({ value });
const br$ = () => createElement('br');
const select$ = (...children) => createElement$('select', ...children);
const button$ = (...children) => createElement$('button', ...children);
const option$ = ({ value, label }) =>
  createElement$('option', label).setProps({ value });
const input$ = (value = '') => createElement$('input').setProps({ value });
const canvas$ = ({ width$, height$ }) =>
  createElement$('canvas').setProps({
    width: width$,
    height: height$,
  });

module.exports = {
  createElement$,
  div$,
  span$,
  h1$,
  textArea$,
  br$,
  select$,
  button$,
  option$,
  input$,
  canvas$,
};
