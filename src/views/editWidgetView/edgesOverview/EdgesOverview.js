const EdgesOverview$ = ({ state, widgetId }) => {
  const structure = state.customDashboardWidgets.find(
    widget => widget.id === widgetId
  );
  const edgeInfoBoxes = Replaceable(() =>
    div$(...structure.edges.map(edge => EdgeInfoBox$({ structure, edge })))
  );
  window.addEventListener('UPDATED_STRUCTURE', () => {
    edgeInfoBoxes.update();
  });
  return div$(
    div$('Edges'),
    edgeInfoBoxes,
    NewEdgeInfoForm$({ state, structure })
  ).setStyle({
    height: 'calc(100% - 80px)',
    overflow: 'auto',
  });
};
