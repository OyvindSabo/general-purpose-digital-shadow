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

module.exports = { doAddInnerShadow, doAddShadow, doUpdateChildren };
