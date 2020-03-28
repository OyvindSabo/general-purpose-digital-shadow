const Observable = include('src/libraries/observable/Observable.js');

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
const canvas$ = ({ width$, height$ }) =>
  createElement$('canvas').setProps({
    width: width$,
    height: height$,
  });

module.exports = {
  createElement$,
  div$,
  h1$,
  textArea$,
  br$,
  select$,
  button$,
  option$,
  input$,
  canvas$,
};
