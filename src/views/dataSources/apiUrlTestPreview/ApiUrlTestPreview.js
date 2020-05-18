const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiUrlTestPreview = (_, children) => {
  // TODO: line-height, max-height and min-height here seem kind of random
  const element = compose(
    'div',
    {
      style: `color: lightslategray;
              line-height: 32px;
              display: inline-block;
              box-sizing: border-box;
              white-space: pre-wrap;
              max-height: 448px;
              min-height: 48px;
              overflow: auto;
              
              border-radius: 5px;
              font-family: "Courier New", Courier, monospace;
              background: rgba(0, 0, 0, 0.05);
              outline: none;
              font-size: 15px;
              padding: 10px;
              border: none;
              resize: none;
              width: 100%;
              box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;`,
    },
    children
  );
  return element;
};

module.exports = ApiUrlTestPreview;
