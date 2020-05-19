const ApiInputLabel = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

// getProps::() => { state, viewModel }
const ApiIntervalInput = (getProps) => {
  const element = compose('div', {}, [
    compose(
      'span',
      {
        style: `box-sizing: border-box;
                display: inline-block;
                padding: 10px;
                width: 160px;`,
      },
      [ApiInputLabel(() => ({ innerText: 'Fetch interval (s)' }))]
    ),
    compose(
      'span',
      {
        style: `box-sizing: border-box;
                display: inline-block;
                padding: 10px;
                width: calc(100% - 160px);`,
      },
      [
        compose(
          'input',
          () => ({
            type: 'number',
            min: '0',
            oninput: ({ value }) => {
              const { state, viewModel } = getProps();
              viewModel.updateApiInterval(state.selectedProjectId, value);
            },
            style: `border-radius: 5px;
                    font-family: "Courier New", Courier, monospace;
                    background: rgba(0, 0, 0, 0.05);
                    outline: none;
                    font-size: 15px;
                    padding: 10px;
                    border: none;
                    width: 100%;
                    box-shadow: inset rgba(0, 0, 0, 0.5) 0 0 10px -5px;`,
          }),
          [getProps().state.selectedApiInterval]
        ),
      ]
    ),
  ]);
  return Object.assign(element, { key: 'api-interval-input' });
};

module.exports = ApiIntervalInput;
