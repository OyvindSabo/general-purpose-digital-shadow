const ApiIntervalInput = include(
  'src/views/dataSources/apiIntervalInput/ApiIntervalInput.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');
const ApiUrlInput = include('src/views/dataSources/apiUrlInput/ApiUrlInput.js');

// getProps:: () => { viewModel, state }
const DataSources = (getProps) => {
  return compose('div', () => ({}), [
    ApiUrlInput(getProps),
    ApiIntervalInput(getProps),
  ]);
};

module.exports = DataSources;
