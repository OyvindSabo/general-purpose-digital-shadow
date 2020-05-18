const HorizontalNavigator = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle, ExportButton } = include('src/app/titleBar/atoms.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ExportedTitleBar = (getProps) => {
  const element = HorizontalNavigator(
    () => ({}),
    () => [
      ViewTitle(
        () => ({}),
        () => [
          compose(
            'span',
            {
              style: `color: darkslategray;
                        cursor: pointer;`,
              onclick: () => {
                location.hash = '#!/';
              },
            },
            [getProps().state.selectedProjectName]
          ),
        ]
      ),
    ]
  );
  return element;
};

module.exports = ExportedTitleBar;
