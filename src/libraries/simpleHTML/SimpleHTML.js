const doUpdateChildren = (element, newChildren) => {
  newChildren.forEach((newChild, index) => {
    if (element.childNodes[index] === newChild) return;
    while (
      element.childNodes[index] &&
      !newChildren.includes(element.childNodes[index])
    ) {
      element.removeChild(element.childNodes[index]);
    }
    if (index === 0) {
      element.appendChild(newChild);
      return;
    }
    element.childNodes[index - 1].insertAdjacentElement('afterEnd', newChild);
  });
  while (newChildren.length < element.childNodes.length) {
    element.removeChild(element.childNodes[newChildren.length]);
  }
};

module.exports = { doUpdateChildren };
