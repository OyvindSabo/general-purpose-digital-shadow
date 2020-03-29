const { cond$, eq$ } = include('src/libraries/observable/utils.js');

const getViewTitle$ = currentRoute$ =>
  cond$(
    [eq$(currentRoute$, '/'), 'Projects'],
    [eq$(currentRoute$, '/projects/<projectId:string>'), 'Data sources'],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/data-sources'),
      'Data sources',
    ],
    [eq$(currentRoute$, '/projects/<projectId:string>/values'), 'Values'],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/values/edit'),
      'Edit values',
    ],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/dashboards'),
      'Dashboards',
    ],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/dashboards/edit'),
      'Edit dashboards',
    ]
  );

module.exports = {
  getViewTitle$,
};
