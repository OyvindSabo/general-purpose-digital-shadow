const Observable = include('src/libraries/observable/Observable.js');

const observableToNode$ = observable$ => {
  if (
    // If it is observable value
    observable$ instanceof Observable
  ) {
    if (['string', 'number'].includes(typeof observable$.value)) {
      const textElement = document.createElement('span');
      const textNode = document.createTextNode(observable$.value);
      textElement.appendChild(textNode);
      textElement.classList.add(observable$.id);
      window.addEventListener(observable$.id, ({ detail }) => {
        textElement.innerHTML = '';
        textElement.appendChild(document.createTextNode(detail));
      });
      return textElement;
    }
    if (Array.isArray(observable$.value)) {
      const elements = observable$.value.map(observableToNode$).flat();
      elements.forEach((element, index) => {
        element.classList.add(`${observable$.id}${index}`);
        window.addEventListener(observable$.id, ({ detail }) => {
          console.log('Listener triggered');
          // Remove all the existing elements except the first
          let insertionPositions = [];
          for (let index = 0; index < 100; index++) {
            Array.from(
              document.getElementsByClassName(`${observable$.id}${index}`)
            ).forEach((elementToReplace, i) => {
              const insertionParent = elementToReplace.parentNode;
              const insertionIndex = Array.from(
                elementToReplace.parentNode.children
              ).indexOf(elementToReplace);
              insertionPositions.push({
                parent: insertionParent,
                insertionIndex: insertionIndex,
              });
              elementToReplace.parentNode.removeChild(elementToReplace);
            });
          }
          console.log('Removed everything except the first element');

          // For each of the first existing elements
          console.log(
            'firstElements: ',
            document.getElementsByClassName(`${observable$.id}0`)
          );
          insertionPositions.forEach(({ parent, insertionIndex }, index) => {
            // Create a fragment and add all the elements inside it
            const fragment = document.createDocumentFragment();
            observable$.value.forEach((arrayElement, index) => {
              // I might need to have another level of loop here in case observableToNode$ returns more than one node
              const node = observableToNode$(arrayElement);
              node.classList.add(`${observable$.id}${index}`);
              fragment.appendChild(node);
            });
            console.log('fragment: ', fragment);
            // Repalact the first elemet with the fragments containing the new elements
            parent.insertBefore(fragment, parent.children[insertionIndex]);
          });
        });
      });
      return elements;
    }
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
  const nodes = observables.map(observableToNode$).flat();
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
