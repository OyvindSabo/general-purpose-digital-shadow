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

    // As long as there is an old child node at the current index which does not correspond to any of the new childNodes, remove it
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

const flatten = (items) => {
  const flat = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
};

const compose = (elementType, getProps, children) => {
  const element = document.createElement(elementType);

  // Assign props
  if (typeof getProps === 'function') {
    Object.assign(element, getProps());
  } else {
    Object.assign(element, getProps);
  }

  // Append children
  element.append(...flatten(children).filter(Boolean));

  element.update = () => {
    // We update the props only if they are provided as a function. Otherwise they are static.
    if (typeof getProps === 'function') {
      if (element.setSelectionRange) {
        const { selectionStart, selectionEnd } = element;
        element.setSelectionRange(selectionStart, selectionEnd);
      } else {
        Object.assign(element, getProps());
      }
    }

    Array.from(element.childNodes).forEach((childNode) => {
      if (typeof childNode.update === 'function') {
        childNode.update();
      }
    });
  };
  return element;
};

const createHiddenElement = () => {
  const element = Object.assign(document.createElement('span'), {
    style: 'display: none;',
  });
  return element;
};

const Each = (getArray, mappingFunction) => {
  const logicElement = createHiddenElement();
  let array = getArray();
  let childNodes = flatten(
    array.map((_, i) =>
      mappingFunction(
        () => getArray()[i],
        () => i,
        getArray
      )
    )
  );

  logicElement.update = () => {
    const newArray = getArray();

    if (newArray.length === array.length) {
      childNodes.forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }

    if (newArray.length > array.length) {
      childNodes.forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });

      const newChildNodes = flatten(
        newArray.slice(array.length).map((_, i) =>
          mappingFunction(
            () => getArray()[i + array.length],
            () => i + array.length,
            getArray
          )
        )
      );

      newChildNodes.forEach((newChildNode) => {
        logicElement.parentNode.insertBefore(newChildNode, logicElement);
      });

      array = newArray;
      childNodes = [...childNodes, ...newChildNodes];
      return;
    }

    if (newArray.length < array.length) {
      // Remove superfluous nodes
      const childrenToBeRemoved = childNodes.slice(newArray.length);
      childrenToBeRemoved.forEach((childNodeToBeRemoved) => {
        logicElement.parentNode.removeChild(childNodeToBeRemoved);
      });

      // Update variables
      array = newArray;
      childNodes = childNodes.slice(0, newArray.length);

      // Update current child nodes
      childNodes.forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
    }
  };

  return [...childNodes, logicElement];
};

// For the child nodes to be updatable they do need to be nodes which can be
// referenced, and not strings, for instance. Strings should rather be passed
// as an innerText prop. If both text and elements need to exist side by side,
// the text should be passed as text nodes.
const If = (getCondition, getThenChildNodes, getElseChildNodes = () => []) => {
  // The hidden element is a span since if it was a div it would be a block
  // element and block element cannot be children of inline elements.
  const logicElement = createHiddenElement();
  let condition = getCondition();
  // TODO: Maybe these should be flattened? Or maybe not? WIll nested If's work?
  let childNodes = condition ? getThenChildNodes() : getElseChildNodes();
  logicElement.update = () => {
    if (condition && getCondition()) {
      childNodes.forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }
    if (!condition && getCondition()) {
      condition = true;
      const thenChildNodes = getThenChildNodes();
      // Remove the old children
      childNodes.forEach((childNode) => {
        childNode.parentNode.removeChild(childNode);
      });
      // Add the new children
      thenChildNodes.forEach((thenChildNode) => {
        logicElement.parentNode.insertBefore(thenChildNode, logicElement);
      });
      childNodes = thenChildNodes;
      return;
    }
    if (condition && !getCondition()) {
      condition = false;
      const elseChildNodes = getElseChildNodes();
      // Remove the old children
      childNodes.forEach((childNode) => {
        childNode.parentNode.removeChild(childNode);
      });
      // Add the new children
      elseChildNodes.forEach((elseChildNode) => {
        logicElement.parentNode.insertBefore(elseChildNode, logicElement);
      });
      childNodes = elseChildNodes;
      return;
    }
  };
  return [...childNodes, logicElement];
};

const withKey = (element, key) => {
  element.key = key;
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
  compose,
  Each,
  If,
  withKey,
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
