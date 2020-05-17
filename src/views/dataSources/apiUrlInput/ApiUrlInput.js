const FullWidthCard = include('src/components/fullWidthCard/FullWidthCard.js');
const ApiInputLabel = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const ApiInputContainer = include(
  'src/views/dataSources/apiInputContainer/ApiInputContainer.js'
);
const TextButton = include('src/components/textButton/TextButton.js');
const ApiUrlTestPreview = include(
  'src/views/dataSources/apiUrlTestPreview/ApiUrlTestPreview.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiUrlInput = (getProps) => {
  const { viewModel } = getProps();
  const element = FullWidthCard({}, [
    compose('div', () => ({ style: { minHeight: '128px' } }), [
      ApiInputLabel(() => ({}), ['API URL']),
      ApiInputContainer(() => ({}), [
        compose(
          'input',
          () => ({
            oninput: ({ value }) => {
              viewModel.updateApiUrl(getProps().state.selectedProjectId, value);
            },
            value: getProps().state.selectedApiUrl,
          }),
          []
        ),
      ]),
      compose(
        'span',
        () => ({
          style: {
            textAlign: 'left',
            width: '192px',
            height: '64px',
            float: 'left',
          },
        }),
        [
          TextButton(
            () => ({
              onclick: getProps().state.testApiUrlInput,
            }),
            ['Test API URL']
          ),
        ]
      ),
      compose('span', () => ({ style: { width: 'calc(100% - 208px)' } }), [
        ApiUrlTestPreview(() => ({}), [
          getProps().state.selectedApiUrlTestPreview,
        ]),
      ]),
    ]),
  ]);
  return element;
};

module.exports = ApiUrlInput;
