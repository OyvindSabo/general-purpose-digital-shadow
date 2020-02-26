const EdgesOverview$ = ({ state, widgetId }) =>
  div$(
    div$('Edges'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .edges.map(edge => EdgeInfoBox$(edge))
  );
