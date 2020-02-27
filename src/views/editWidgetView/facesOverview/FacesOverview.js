const FacesOverview$ = ({ state, widgetId }) => {
  const structure = state.customDashboardWidgets.find(
    widget => widget.id === widgetId
  );
  return div$(
    div$('Faces'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .faces.map(face => FaceInfoBox$({ structure, face }))
  ).setStyle({
    height: 'calc(100% - 80px)',
    overflow: 'auto',
  });
};
