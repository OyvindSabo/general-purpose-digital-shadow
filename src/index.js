const Router = include('src/libraries/simpleRouter/SimpleRouter.js');
const simpleState = include('src/libraries/simpleState/SimpleState.js');
const Model = include('src/model/Model.js');
const App = include('src/app/App.js');
const { compose } = include('src/libraries/simpleHTML/SimpleHTML.js');

Object.assign(document.body.style, {
  margin: 0,
  fontFamily: 'sans-serif',
  background: 'GhostWhite',
  height: '100%',
});

const isExported = false;

// Create router
const router = isExported
  ? new Router({
      '/': 'Dashboard',
    })
  : new Router({
      '/': 'Projects',
      '/projects/<projectId:string>': 'Data sources',
      '/projects/<projectId:string>/data-sources': 'Data sources',
      '/projects/<projectId:string>/values': 'Values',
      '/projects/<projectId:string>/values/edit': 'Edit values',
      '/projects/<projectId:string>/dashboard': 'Dashboard',
      '/projects/<projectId:string>/dashboard-editor': 'Edit dashboard',
      '/projects/<projectId:string>/dashboard-editor/widgets-preview':
        'Edit dashboard',
      '/projects/<projectId:string>/dashboard-editor/raw-output':
        'Edit dashboard',
      '/projects/<projectId:string>/dashboard-editor/problems':
        'Edit dashboard',
    });

const { state, setState, addStateChangeListener } = simpleState({
  currentRoute: router.currentRoute,
  params: router.params,
  isExported,
  projects: [],
  selectedProjectId: null,
  selectedProjectName: '',
  lastVisitedProjectView: null,
  selectedApiUrl: '',
  selectedApiUrlTestPreview: '',
  selectedApiInterval: null,
  apiResponse: '',
  selectedDerivedValuesCode: '',
  selectedWidgetsCode: '',
  widgetsCodeRawOutput: '',
  widgets: [],
});

const viewModel = Model({ router, state, setState });

const app = compose('div', {}, [
  App(() => ({
    state,
    setState,
    viewModel,
  })),
]);

addStateChangeListener(app.update);

document.body.appendChild(app);
