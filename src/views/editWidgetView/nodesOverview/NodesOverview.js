const NodesOverview$ = ({ state, widgetId }) =>
  div$(
    div$('Nodes'),
    ...state.customDashboardWidgets
      .find(widget => widget.id === widgetId)
      .vertexIds.map(vertexId =>
        structure.vertices.find(vertex => vertex.id === vertexId)
      )
      .filter(Boolean)
      .map(node => NodeInfoBox$(node))
  );
