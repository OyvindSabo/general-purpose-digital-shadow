const HorizontalNavigator = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle } = include('src/app/titleBar/atoms.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const ExportedTitleBar = (getProps) => {
  const element = HorizontalNavigator(() => ({}), [
    ViewTitle(() => ({}), [
      compose(
        'span',
        () => ({
          innerText: getProps().state.selectedProjectName,
          style: `color: darkslategray;
                        cursor: pointer;`,
          onclick: () => {
            location.hash = '#!/';
          },
        }),
        []
      ),
    ]),
  ]);
  return element;
};

module.exports = ExportedTitleBar;
