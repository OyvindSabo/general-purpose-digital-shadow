// Observable

const Observable = include('src/libraries/observable/Observable.js');
const { eq$, choose$, or$, not$, toFixed$ } = include(
  'src/libraries/observable/utils.js'
);
const { div$, textArea$, canvas$ } = include(
  'src/libraries/observableHtml/ObservableHtml.js'
);
const { If$, Choose$ } = include('src/libraries/observableHtml/utils.js');

const TopNavigator$ = include('src/components/topNavigator/TopNavigator.js');
const LeftNavigatorButton$ = include(
  'src/components/leftNavigatorButton/LeftNavigatorButton.js'
);
const LeftNavigator$ = include('src/components/leftNavigator/LeftNavigator.js');
const ViewContainer$ = include('src/components/viewContainer/ViewContainer.js');
const MainContainer$ = include('src/components/mainContainer/MainContainer.js');
const Home$ = include('src/views/home/Home.js');
const DataSources$ = include('src/views/dataSources/DataSources.js');
const AlertsView$ = () => div$('AlertsView');

const ExpandCodeEditorButton$ = include(
  'src/components/expandCodeEditorButton/ExpandCodeEditorButton.js'
);

const CodeEditor$ = include('src/components/codeEditor/CodeEditor.js');

const SmallWidgetBackgroundContainer$ = (...children) => {
  return div$(...children).setStyle({
    padding: '20px',
    width: '360px',
    height: '240px',
    display: 'inline-block',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  });
};

const WidgetForegroundContainer$ = include(
  'src/components/widgetForegroundContainer/WidgetForegroundContainer.js'
);

const ValueWidgetLabel$ = ({ label$ }) =>
  div$(label$).setStyle({
    fontSize: '20px',
    marginTop: '20px',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  });

const ValueWidgetValue$ = ({ value$ }) =>
  div$(toFixed$(value$, 2)).setStyle({
    fontSize: '60px',
    textAlign: 'center',
    width: '100%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
  });

const ValueWidget$ = ({ label$, value$, isEmpty$ }) =>
  If$(
    not$(isEmpty$),
    SmallWidgetBackgroundContainer$(
      WidgetForegroundContainer$(
        ValueWidgetLabel$({ label$ }),
        ValueWidgetValue$({ value$ })
      ).setStyle({ height: '100%', position: 'relative', color: 'dimgray' })
    )
  );

const ValuesView$ = ({ state, currentRoute$ }) => {
  const codeEditorIsOpen$ = eq$(currentRoute$, '/values/edit');
  return div$(
    ExpandCodeEditorButton$({
      icon: '{}',
      label$: choose$(codeEditorIsOpen$, 'Hide editor', 'Show editor'),
      isOpen$: codeEditorIsOpen$,
    }).onClick(() => {
      location.hash = codeEditorIsOpen$.value ? '#!/values' : '#!/values/edit';
    }),
    div$(
      CodeEditor$(state.derivedValuesCode$)
        .onInput(({ value }) => {
          state.derivedValuesCode$.value = value;
        })
        .setStyle({ paddingLeft: '80px' })
    ).setStyle({
      display: 'inline-block',
      width: choose$(codeEditorIsOpen$, '50%', '0'),
      transition: '0.5s',
      overflow: 'hidden',
    }),
    div$(
      div$(
        ...state.derivedValues.map(({ label$, value$, isEmpty$ }) =>
          ValueWidget$({ label$, value$, isEmpty$ })
        )
      ).setStyle({ position: 'relative', top: '0' })
    ).setStyle({
      display: 'inline-block',
      position: 'absolute',
      paddingLeft: choose$(codeEditorIsOpen$, '0', '80px'),
      transition: '0.5s',
    })
  ).setStyle({ width: '100%' });
};

const Dashboards$ = include('src/views/dashboards/Dashboards.js');

const App = ({ params, currentRoute$, state }) => {
  const element = div$(
    TopNavigator$(),
    MainContainer$(
      LeftNavigator$(
        // Add something for home as well
        LeftNavigatorButton$({
          icon: '🏗',
          label: 'Data sources',
          route: '/data-sources',
          isActive$: eq$(currentRoute$, '/data-sources'),
        }),
        LeftNavigatorButton$({
          icon: '🧮',
          label: 'Values',
          route: '/values',
          isActive$: or$(
            eq$(currentRoute$, '/values'),
            eq$(currentRoute$, '/values/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '📊',
          label: 'Dashboards',
          route: '/dashboards',
          isActive$: or$(
            eq$(currentRoute$, '/dashboards'),
            eq$(currentRoute$, '/dashboards/edit')
          ),
        }),
        LeftNavigatorButton$({
          icon: '⏰',
          label: 'Alerts',
          route: '/alerts',
          isActive$: eq$(currentRoute$, '/alerts'),
        })
      ),
      // Not sure I'm happy about this solution
      ViewContainer$(
        If$(eq$(currentRoute$, '/'), Home$()),
        If$(eq$(currentRoute$, '/data-sources'), DataSources$()),
        If$(
          or$(
            eq$(currentRoute$, '/values'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/values/edit'),
            eq$(currentRoute$, '/values')
          ),
          ValuesView$({ state, currentRoute$ })
        ),
        If$(
          or$(
            eq$(currentRoute$, '/dashboards'), // Hack, for some reason the code editor animation doesn't work without this
            eq$(currentRoute$, '/dashboards/edit'),
            eq$(currentRoute$, '/dashboards')
          ),
          Dashboards$({ state, currentRoute$ })
        ),
        If$(eq$(currentRoute$, '/alerts'), AlertsView$())
      )
    )
  );

  return element;
};

module.exports = App;
