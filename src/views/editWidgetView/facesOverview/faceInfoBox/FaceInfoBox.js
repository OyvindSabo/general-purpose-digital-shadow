const FaceInfoBox$ = ({ structure, face }) => {
  const { color$, vertexIds } = face;
  const vertices = vertexIds
    .map(vertexId$ =>
      structure.vertices.find(vertex => vertex.id === vertexId$.value)
    )
    .filter(Boolean);
  return InfoBox$(
    div$(add$('color: ', color$)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    ...vertices.map((vertex, i) => div$(add$('node ', vertex.id)))
  );
};
