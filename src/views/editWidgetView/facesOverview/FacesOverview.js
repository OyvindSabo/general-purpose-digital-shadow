const FacesOverview$ = ({ state, widgetId }) =>
  div$(
    div$('Faces'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .faces.map(face => FaceInfoBox$(face))
  );
