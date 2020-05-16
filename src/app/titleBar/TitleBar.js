const HorizontalNavigator = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle, ExportButton } = include('src/app/titleBar/atoms.js');

const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

const TitleBar = (getProps) => {
  const { viewModel, state } = getProps();
  const { isExported, currentRoute } = state;
  return HorizontalNavigator(() => ({}), [
    ViewTitle(() => ({}), [
      !isExported
        ? compose(
            'span',
            () => ({
              onclick: () => (location.hash = '#!/projects'),
              style: { cursor: 'pointer' },
            }),
            ['Projects']
          )
        : null,
      compose(
        'span',
        () => ({
          style: {
            color: isExported
              ? 'darkslategray'
              : currentRoute.indexOf('/projects/<projectId:string>') === 0
              ? 'darkslategray'
              : 'lightgray',
            cursor: 'pointer',
          },
          onclick: () => {
            if (isExported) {
              location.hash = '#!/';
              return;
            }
            location.hash = `#!/projects/${state.selectedProjectId}/${
              viewModel.lastVisitedProjectView || ''
            }`;
          },
        }),
        [
          state.selectedProjectName
            ? isExported
              ? state.selectedProjectName
              : ` / ${state.selectedProjectName}`
            : '',
        ]
      ),
    ]),
    !isExported
      ? ExportButton(
          () => ({
            onclick: () => {
              const { state } = getProps();
              const element = document.createElement('a');
              // SInce just the first occurrence of the code will be replaced, we need to make sure that this code does not replace itself, so we construct the match on call time
              const fileContent = document.head.innerHTML
                .replace(
                  '*c*o*n*s*t* *i*s*E*x*p*o*r*t*e*d* *=* *f*a*l*s*e*;*'
                    .split('*')
                    .join(''),
                  '*c*o*n*s*t* *i*s*E*x*p*o*r*t*e*d* *=* *t*r*u*e*;*'
                    .split('*')
                    .join('')
                )
                .replace(
                  '*c*o*n*s*t* *g*e*t*E*x*p*o*r*t*e*d*P*r*o*j*e*c*t* *=* *(*)* *=*>* *[*]*;*'
                    .split('*')
                    .join(''),
                  `*c*o*n*s*t* *g*e*t*E*x*p*o*r*t*e*d*P*r*o*j*e*c*t* *=* *(*)* *=*>*`
                    .split('*')
                    .join('') +
                    JSON.stringify([
                      {
                        id: state.selectedProjectId,
                        name: state.selectedProjectName,
                        apiUrl: state.selectedApiUrl,
                        apiInterval: state.selectedApiInterval,
                        derivedValuesCode: state.selectedDerivedValuesCode,
                        widgetsCode: state.selectedWidgetsCode,
                      },
                    ])
                );
              const file = new Blob([fileContent], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = `${state.selectedProjectName
                .toLowerCase()
                .split(' ')
                .join('-')}.html`;
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
            },
          }),
          ['Export']
        )
      : null,
  ]);
};

module.exports = TitleBar;
