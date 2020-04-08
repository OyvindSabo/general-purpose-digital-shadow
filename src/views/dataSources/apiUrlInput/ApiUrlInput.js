const FullWidthCard$ = include('src/components/fullWidthCard/FullWidthCard.js');
const ApiInputLabel$ = include(
  'src/views/dataSources/apiInputLabel/ApiInputLabel.js'
);
const Input$ = include('src/components/input/Input.js');
const ApiInputContainer$ = include(
  'src/views/dataSources/apiInputContainer/ApiInputContainer.js'
);
const TextButton$ = include('src/components/textButton/TextButton.js');
const { div$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const ApiUrlInput$ = ({ viewModel }) =>
  FullWidthCard$(
    div$(
      ApiInputLabel$('API URL'),
      ApiInputContainer$(
        Input$(viewModel.selectedApiUrl$).onInput(({ value }) => {
          viewModel.updateApiUrl(viewModel.selectedProjectId$.value, value);
        })
      ),
      TextButton$('Test API URL').setStyle({
        textAlign: 'left',
        width: '192px',
      })
    )
  );

module.exports = ApiUrlInput$;
