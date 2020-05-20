const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiInputLabel = (getProps) => {
  const element = compose(
    'span',
    () => ({
      innerText: getProps().innerText,
      // width = 8 x 20px
      // height = 2 x 20px
      style: `color: dimgray;
              height: 40px;
              padding: 10px;
              line-height: 40px;
              font-size: 15px;
              width: 160px;
              display: inline-block;`,
    }),
    []
  );
  return element;
};

module.exports = ApiInputLabel;
