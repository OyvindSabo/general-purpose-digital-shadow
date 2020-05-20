const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiUrlTestPreview = (getProps) => {
  const element = compose(
    'div',
    () => ({
      innerText: getProps().innerText,
      style: `box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;
              font-family: "Courier New", Courier, monospace;
              background: rgba(0, 0, 0, 0.05);
              box-sizing: border-box;
              color: lightslategray;
              display: inline-block;
              white-space: pre-wrap;
              border-radius: 5px;
              line-height: 40px;
              max-height: 300px;
              min-height: 40px;
              font-size: 15px;
              overflow: auto;
              outline: none;
              padding: 10px;
              border: none;
              resize: none;
              width: 100%;`,
    }),
    []
  );

  return element;
};

module.exports = ApiUrlTestPreview;
