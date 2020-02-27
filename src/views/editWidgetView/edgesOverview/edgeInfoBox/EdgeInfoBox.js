const EdgeInfoBox$ = ({ structure, edge }) => {
  const { color$, vertexIds, width$ } = edge;
  const vertices = vertexIds
    .map(vertexId$ =>
      structure.vertices.find(vertex => vertex.id === vertexId$.value)
    )
    .filter(Boolean);
  return InfoBox$(
    div$(add$('color: ', color$)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    div$(add$('Node ', vertices[0].id)),
    div$(add$('Node ', vertices[1].id)),
    br$(),
    div$(add$('width: ', width$))
  );
};
