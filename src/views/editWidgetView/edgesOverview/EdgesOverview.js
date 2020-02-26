const EdgesOverview$ = ({ state, widgetId }) => {
  const structure = state.customDashboardWidgets.find(
    widget => widget.id === widgetId
  );
  return div$(
    div$('Edges'),
    ...structure.edges.map(edge => EdgeInfoBox$({ structure, edge }))
  );
};
