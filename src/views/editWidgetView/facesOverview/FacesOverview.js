const FacesOverview$ = ({ state, widgetId }) => {
  const structure = state.customDashboardWidgets.find(
    widget => widget.id === widgetId
  );
  return div$(
    div$('Faces'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .faces.map(face => FaceInfoBox$({ structure, face }))
  );
};
