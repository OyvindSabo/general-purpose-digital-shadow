const ApiIntervalInput = include(
  'src/views/dataSources/apiIntervalInput/ApiIntervalInput.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');
const ApiUrlInput = include('src/views/dataSources/apiUrlInput/ApiUrlInput.js');

// getProps:: () => { viewModel, state }
const DataSources = (getProps) => {
  const element = compose('div', () => ({}), [
    ApiUrlInput(getProps),
    ApiIntervalInput(getProps),
  ]);
  return Object.assign(element, { key: 'data-sources' });
};

module.exports = DataSources;
