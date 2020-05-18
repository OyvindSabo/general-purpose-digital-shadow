const doAddInnerShadow = (element) => {
  element.style.boxShadow = 'inset rgba(0, 0, 0, 0.25) 0 0 10px -5px';
};

const doAddShadow = (element) => {
  element.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0 0 10px -5px';
};

const doPatchChildren = (
  element,
  newChildren,
  compareFunction = (a, b) => a === b
) => {
  newChildren.forEach((newChild, index) => {
    // If the new child node already exists on the correct index, jump to next iteration
    if (compareFunction(newChild, element.childNodes[index])) return;

    // As long as there is an old child node at the current index which is not correspond to any of the new childNodes, remove it
    while (
      element.childNodes[index] &&
      !newChildren.some((newChild) =>
        compareFunction(newChild, element.childNodes[index])
      )
    ) {
      element.removeChild(element.childNodes[index]);
    }

    // Insert the new child node at the correct position
    if (element.childNodes[index]) {
      element.insertBefore(newChild, element.childNodes[index]);
      return;
    }
    // TODO: Find out why this is needed
    if (!(newChild.contains && newChild.contains(element))) {
      element.append(newChild);
    }
    return;
  });

  // Remove any superfluous old nodes which don't correspond to the new nodes
  while (newChildren.length < element.childNodes.length) {
    element.removeChild(element.childNodes[newChildren.length]);
  }
};

const determineIsNullish = (value) => value === null || value === undefined;

const getNodeRepresentation = (child) => {
  if (typeof child === 'string') return document.createTextNode(child);
  if (typeof child === 'number') return document.createTextNode(child);
  return child;
};

const callUntilNotFunction = (valueOrFunction) => {
  if (typeof valueOrFunction === 'function') {
    return callUntilNotFunction(valueOrFunction());
  }
  return valueOrFunction;
};

const getCleanedChildNodes = (children) => {
  console.log('children: ', children);
  console.log(
    'cleanedChildren: ',
    children.map(getNodeRepresentation).filter(Boolean)
  );
  return children.map(getNodeRepresentation).filter(Boolean);
};

/**
 * A component is a function which returns an element and and update method
 * @param {*} elementType
 * @param {*} props
 * @param {*} children
 */
const compose = (elementType, getProps, getChildren) => {
  const element = document.createElement(elementType);

  if (typeof getProps === 'function') {
    Object.assign(element, getProps());
  } else {
    Object.assign(element, getProps);
  }

  if (typeof getChildren === 'function') {
    element.append(...getChildren().filter(Boolean));
  } else {
    element.append(...getChildren.filter(Boolean));
  }

  element.update = () => {
    // We update the props only if they are provided as a function. Otherwise they are static.
    if (typeof getProps === 'function') {
      if (element.selectionStart !== null && element.selectionRange !== null) {
        const { selectionStart, selectionEnd } = element;
        Object.assign(element, getProps(), { selectionStart, selectionEnd });
      } else {
        Object.assign(element, getProps());
      }
    }
    if (typeof getChildren === 'function') {
      const newChildNodes = getChildren().filter(Boolean);
      doPatchChildren(element, newChildNodes, (node1, node2) => {
        if (node1 && node2 && node1.key && node2.key) {
          return node1.key === node2.key;
        }
        return false;
      });
    }

    Array.from(element.childNodes).forEach((childNode) => {
      if (typeof childNode.update === 'function') {
        childNode.update();
      }
    });
  };
  return element;
};

class SimpleHTML {
  static isProp = (propsOrChild) =>
    !(propsOrChild instanceof HTMLElement || typeof propsOrChild === 'string');
  static makeElement(elementType, propsOrChild, ...maybeAllChildren) {
    const element = document.createElement(elementType);
    const hasProps = SimpleHTML.isProp(propsOrChild);
    const props = hasProps ? propsOrChild || {} : {};
    const children = hasProps
      ? maybeAllChildren
      : [propsOrChild, ...maybeAllChildren];
    Object.entries(props).forEach(([attribute, value]) => {
      if (attribute === 'style') {
        Object.assign(element.style, value);
      } else if (attribute === 'onClick') {
        element.onclick = value;
      } else if (attribute === 'onInput') {
        element.oninput = value;
      } else {
        element[attribute] = value;
      }
    });
    children
      .filter(Boolean)
      .map((child) =>
        typeof child === 'string' ? document.createTextNode(child) : child
      )
      .forEach((child) => {
        element.appendChild(child);
      });
    return element;
  }
}

const doMerge = (oldElement, newElement) => {
  if (!oldElement.parentNode) return;

  const oldChildren = Array.from(oldElement.childNodes);
  const newChildren = Array.from(newElement.childNodes);
  newChildren.forEach((newChild, i) => {
    let foundMatchingOldChild = false;
    while (oldChildren.length && !foundMatchingOldChild) {
      oldChild = oldChildren.shift();
      if (
        oldChild.component === newChild.component &&
        oldChild instanceof Element
      ) {
        const selectionStart = oldChild.selectionStart;
        const selectionEnd = oldChild.selectionEnd;
        oldChild.value = newChild.value;
        oldChild.selectionStart = selectionStart;
        oldChild.selectionEnd = selectionEnd;

        oldChild.update(...newChild.propsAndChildren);
        if (Object.keys(newChild.propsAndChildren[0]).includes('style')) {
          if (!oldChild.style) {
            Object.keys(oldChild.parentNode.style).forEach((property) => {
              if (!newChild.propsAndChildren[0].style[property]) {
                oldChild.parentNode.style[property] = null;
              }
            });
            Object.assign(
              oldChild.parentNode.style,
              newChild.propsAndChildren[0].style
            );
          } else {
            Object.keys(oldChild.parentNode.style).forEach((property) => {
              if (!newChild.propsAndChildren[0].style[property]) {
                oldChild.style[property] = null;
              }
            });
            Object.assign(oldChild.style, newChild.propsAndChildren[0].style);
          }
        }
        oldChild.innerText = newChild.innerText;

        foundMatchingOldChild = true;
      } else if (
        !(oldChild instanceof Element) &&
        !(newChild instanceof Element)
      ) {
        if (oldChild.data === newChild.data) {
          foundMatchingOldChild = true;
        } else {
          oldChild.data = newChild.data;
        }
        foundMatchingOldChild = true;
      } else {
        oldElement.removeChild(oldChild);
      }
    }
    if (!foundMatchingOldChild) {
      while (oldElement.childNodes[i]) {
        oldElement.removeChild(oldElement.childNodes[i]);
      }
      oldElement.appendChild(newChild);
    }
  });
  while (newChildren.length < oldElement.childNodes.length) {
    oldElement.removeChild(oldElement.childNodes[newChildren.length]);
  }
};

const defineComponent = (elementFunction) => {
  const component = (...propsAndChildren) => {
    const element = elementFunction(...propsAndChildren);
    element.component = component;
    element.propsAndChildren = propsAndChildren;
    element.update = (...newPropsAndChildren) => {
      element.propsAndChildren = newPropsAndChildren;
      doMerge(element, component(...newPropsAndChildren));
    };
    return element;
  };
  return component;
};

const div = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('div', props, ...children)
);

const span = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('span', props, ...children)
);

const a = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('a', props, ...children)
);

const p = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('p', props, ...children)
);

const h1 = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('h1', props, ...children)
);

const h2 = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('h2', props, ...children)
);

const img = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('img', props, ...children)
);

const form = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('form', props, ...children)
);

const input = defineComponent((props) =>
  SimpleHTML.makeElement('input', props)
);

const textarea = defineComponent((props) =>
  SimpleHTML.makeElement('textarea', props)
);

const br = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('br', props, ...children)
);

const button = defineComponent((props, ...children) =>
  SimpleHTML.makeElement('button', props, ...children)
);
// And so on, fill in more as needed...

module.exports = {
  doMerge,
  callUntilNotFunction,
  compose,
  defineComponent,
  div,
  span,
  a,
  p,
  h1,
  h2,
  img,
  form,
  input,
  textarea,
  br,
  button,
  doAddInnerShadow,
  doAddShadow,
  doPatchChildren,
};
