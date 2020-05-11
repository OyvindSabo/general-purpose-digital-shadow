const { cond$, eq$ } = include('src/libraries/observable/utils.js');

const getViewTitle$ = (currentRoute$) =>
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
    [eq$(currentRoute$, '/projects/<projectId:string>/dashboard'), 'Dashboard'],
    [
      eq$(currentRoute$, '/projects/<projectId:string>/dashboard/edit'),
      'Edit dashboard',
    ]
  );

module.exports = {
  getViewTitle$,
};
