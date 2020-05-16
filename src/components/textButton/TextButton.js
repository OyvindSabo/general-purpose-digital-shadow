const { button$ } = include('src/libraries/observableHtml/ObservableHtml.js');
const Observable = include('src/libraries/observable/Observable.js');
const { choose$ } = include('src/libraries/observable/utils.js');
const { compose, doPatchChildren } = include(
  'src/libraries/simpleHTML/SimpleHTML.js'
);

const TextButton = (getProps, children) => {
  let isHovered = false;
  const element = compose(
    'button',
    () => ({
      onclick: getProps().onclick,
      onmouseenter: () => {
        isHovered = true;
        element.update();
      },
      onmouseleave: () => {
        isHovered = false;
        element.update();
      },
      style: {
        color: isHovered ? 'darkslategray' : 'slategray',
        height: '64px',
        background: 'white',
        lineHeight: '64px',
        fontSize: '16px',
        width: '100%',
        textAlign: 'center',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '0 16px',
      },
    }),
    children
  );
  return element;
};

module.exports = TextButton;
