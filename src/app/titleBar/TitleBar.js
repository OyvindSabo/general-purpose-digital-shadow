const HorizontalNavigator$ = include(
  'src/components/horizontalNavigator/HorizontalNavigator.js'
);
const { ViewTitle$, ExportButton$ } = include('src/app/titleBar/atoms.js');
const withShadow = include('src/styleWrappers/withShadow.js');
const { add$, startsWith$, choose$, not$ } = include(
  'src/libraries/observable/utils.js'
);
const { If$ } = include('src/libraries/observableHtml/utils.js');
const { span$ } = include('src/libraries/observableHtml/ObservableHtml.js');

const TitleBar$ = ({ currentRoute$, viewModel }) => {
  const { isExported } = viewModel;
  return withShadow(HorizontalNavigator$)(
    ViewTitle$(
      If$(
        not$(isExported),
        span$('Projects').onClick(() => (location.hash = '#!/projects'))
      ),
      span$(
        choose$(
          viewModel.selectedProjectName$,
          isExported
            ? viewModel.selectedProjectName$
            : add$(' / ', viewModel.selectedProjectName$),
          ''
        )
      )
        .setStyle({
          color: isExported
            ? 'darkslategray'
            : choose$(
                startsWith$(currentRoute$, '/projects/<projectId:string>'),
                'darkslategray',
                'lightgray'
              ),
        })
        .onClick(() => {
          if (isExported) {
            location.hash = '#!/';
          }
          location.hash = `#!/projects/${viewModel.selectedProjectId$.value}/${
            viewModel.lastVisitedProjectView$.value || ''
          }`;
        })
    ),
    If$(
      not$(isExported),
      ExportButton$('Export').onClick(() => {
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
                  id: viewModel.selectedProjectId$.value,
                  name: viewModel.selectedProjectName$.value,
                  apiUrl: viewModel.selectedApiUrl$.value,
                  apiInterval: viewModel.selectedApiInterval$.value,
                  derivedValuesCode: viewModel.selectedDerivedValuesCode$.value,
                  widgetsCode: viewModel.selectedWidgetsCode$.value,
                },
              ])
          );
        const file = new Blob([fileContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${viewModel.selectedProjectName$.value
          .toLowerCase()
          .split(' ')
          .join('-')}.html`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      })
    )
  ).setStyle({
    background: 'white',
    color: 'darkslategray',
  });
};

module.exports = TitleBar$;
