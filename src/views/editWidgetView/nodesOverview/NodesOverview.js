const NodesOverview$ = ({ state, widgetId }) =>
  div$(
    div$('Nodes'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .vertices.map(node => NodeInfoBox$(node))
  ).setStyle({
    height: 'calc(100% - 80px)',
    overflow: 'auto',
  });
