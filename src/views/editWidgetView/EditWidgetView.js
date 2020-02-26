const EditWidgetView = ({ widgetId }) => {
  const rightNavigatorTab$ = new Observable('Edges');
  console.log('rightNavigatorTab$: ', rightNavigatorTab$);
  const setRightNavigationTab = tab => (rightNavigatorTab$.value = tab);
  return div$(
    RightNavigator$(
      RightNavigatorHeader$(
        RightNavigatorButton({
          icon: '🔵',
          label: 'Nodes',
          isActive: eq$(rightNavigatorTab$, 'Nodes'),
        }).onClick(() => {
          rightNavigatorTab$.value = 'Nodes';
        }),
        RightNavigatorButton({
          icon: '📏',
          label: 'Edges',
          isActive: eq$(rightNavigatorTab$, 'Edges'),
        }).onClick(() => {
          rightNavigatorTab$.value = 'Edges';
        }),
        RightNavigatorButton({
          icon: '🎨',
          label: 'Faces',
          isActive: eq$(rightNavigatorTab$, 'Faces'),
        }).onClick(() => {
          rightNavigatorTab$.value = 'Faces';
        })
      ),
      Switch$(
        rightNavigatorTab$,
        'Nodes',
        NodesOverview$({ state, widgetId }),
        'Edges',
        EdgesOverview$({ state, widgetId }),
        'Faces',
        FacesOverview$({ state, widgetId })
      )
    ),
    CanvasWidget$({
      structure: state.customDashboardWidgets.find(
        widget => widget.id === widgetId
      ),
    })
  );
};
