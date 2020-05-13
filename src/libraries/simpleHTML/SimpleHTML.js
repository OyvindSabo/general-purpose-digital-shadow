const doAddInnerShadow = (element) => {
  element.style.boxShadow = 'inset rgba(0, 0, 0, 0.25) 0 0 10px -5px';
};

const doAddShadow = (element) => {
  element.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0 0 10px -5px';
};

const doUpdateChildren = (element, newChildren) => {
  newChildren.forEach((newChild, index) => {
    if (element.childNodes[index] === newChild) return;
    while (
      element.childNodes[index] &&
      !newChildren.includes(element.childNodes[index])
    ) {
      element.removeChild(element.childNodes[index]);
    }
    if (element.childNodes[index]) {
      element.insertBefore(newChild, element.childNodes[index]);
      return;
    }
    element.appendChild(newChild);
    return;
  });
  while (newChildren.length < element.childNodes.length) {
    element.removeChild(element.childNodes[newChildren.length]);
  }
};

const isNullish = (value) => value === null || value === undefined;
const nullishCoalesce = (primaryValue, backupValue) =>
  isNullish(primaryValue) ? secondaryValue : primaryValue;

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
  doUpdateChildren,
};
