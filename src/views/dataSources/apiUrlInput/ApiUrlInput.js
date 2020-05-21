const ApiInputLabel = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const TextButton = include('src/components/textButton/TextButton.js');
const ApiUrlTestPreview = include(
  'src/views/dataSources/apiUrlTestPreview/ApiUrlTestPreview.js'
);
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ApiUrlInput = (getProps) => {
  const { viewModel } = getProps();
  const element = compose('div', {}, [
    // The row where you can enter the API URL
    compose('div', {}, [
      compose(
        'span',
        {
          style: `box-sizing: border-box;
                  display: inline-block;
                  padding: 10px;
                  width: 160px;`,
        },
        [ApiInputLabel(() => ({ innerText: 'API URL' }))]
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
              oninput: ({ target }) => {
                viewModel.updateApiUrl(
                  getProps().state.selectedProjectId,
                  target.value
                );
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
              value: getProps().state.selectedApiUrl,
            }),
            []
          ),
        ]
      ),
    ]),
    // The row where you can test the API URL
    compose('div', {}, [
      compose(
        'span',
        {
          // float: left makes sure the label stays at the top of the parent div
          // when the preview box next to it expands.
          style: `box-sizing: border-box;
                  display: inline-block;
                  float: left;
                  padding: 10px;
                  width: 160px;`,
        },
        [
          TextButton(() => ({
            innerText: 'Test API URL',
            onclick: getProps().viewModel.testApiUrlInput,
          })),
        ]
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
          ApiUrlTestPreview(
            () => ({ innerText: getProps().state.selectedApiUrlTestPreview }),
            []
          ),
        ]
      ),
    ]),
  ]);
  return element;
};

module.exports = ApiUrlInput;
