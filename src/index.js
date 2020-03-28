const Router = include('src/libraries/router/Router.js');
const model = include('src/model/Model.js');
const App = include('src/App.js');

Object.assign(document.body.style, {
  margin: 0,
  fontFamily: 'sans-serif',
  height: '100%',
});
//const FIREBASE_API_KEY = 'AIzaSyCeGXLqw0MEwiSFHG1Wks1HfQHXRZoOuFY';

// Create router
const router = new Router({
  '/': 'Projects',
  '/data-sources': 'Data sources',
  '/values': 'Values',
  '/values/edit': 'Edit values',
  '/analytics/<analyticId:string>': 'Analytics',
  // TODO: It should be possible to have multiple dashboards
  '/dashboards': 'Dashboards',
  '/dashboards/edit': 'Edit dashboards',
  '/dashboards/<widgetId:string>/edit': 'Edit widget',
  '/alerts': 'Alerts',
});

document.body.appendChild(
  App({
    model,
    params: router.getParams,
    currentRoute$: router.currentRoute$,
  })
);
document.body.update = props =>
  document.body.childNodes.forEach(childNode => {
    if (typeof childNode.update === 'function') {
      childNode.update(props);
    }
  });

router.subscribe(() => document.body.update());
