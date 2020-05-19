const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiInputLabel = (getProps) => {
  const element = compose(
    'span',
    () => ({
      innerText: getProps().innerText,
      // TODO: Make this one align nicely next to the input
      // width = 8 x 20px
      // height = 2 x 20px
      style: `color: dimgray;
              height: 40px;
              padding: 10px;
              line-height: 40px;
              font-size: 15px;
              width: 160px;
              display: inline-block;
              box-sizing: border-box;`,
    }),
    []
  );
  return Object.assign(element, { key: 'api-input-label' });
};

module.exports = ApiInputLabel;
