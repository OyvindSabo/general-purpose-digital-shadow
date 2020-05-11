const Router = include('src/libraries/router/Router.js');
const Model = include('src/model/Model.js');
const App = include('src/app/App.js');

Object.assign(document.body.style, {
  margin: 0,
  fontFamily: 'sans-serif',
  background: 'GhostWhite',
  height: '100%',
});
//const FIREBASE_API_KEY = 'AIzaSyCeGXLqw0MEwiSFHG1Wks1HfQHXRZoOuFY';

const isExported = false;

// Create router
const router = isExported
  ? new Router({
      '/': 'Dashboard',
      '/values': 'Values',
      '/dashboard': 'Dashboard',
    })
  : new Router({
      '/': 'Projects',
      '/projects/<projectId:string>': 'Data sources',
      '/projects/<projectId:string>/data-sources': 'Data sources',
      '/projects/<projectId:string>/values': 'Values',
      '/projects/<projectId:string>/values/edit': 'Edit values',
      '/projects/<projectId:string>/dashboard': 'Dashboard',
      '/projects/<projectId:string>/dashboard/edit': 'Edit dashboard',
    });

const viewModel = Model({ router, isExported });

document.body.appendChild(
  App({
    viewModel,
    params: router.getParams,
    currentRoute$: router.currentRoute$,
  })
);
document.body.update = (props) =>
  document.body.childNodes.forEach((childNode) => {
    if (typeof childNode.update === 'function') {
      childNode.update(props);
    }
  });

router.subscribe(() => document.body.update());
