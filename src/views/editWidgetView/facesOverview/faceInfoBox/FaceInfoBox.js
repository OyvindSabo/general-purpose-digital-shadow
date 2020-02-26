const FaceInfoBox$ = ({ structure, face }) => {
  const { color, vertexIds } = face;
  const vertices = vertexIds
    .map(vertexId => structure.vertices.find(vertex => vertex.id === vertexId))
    .filter(Boolean);
  return div$(
    div$(add$('color: ', color)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    ...vertices.map((vertex, i) => div$(add$('node ', vertex.id)))
  ).setStyle({
    margin: '10px',
    padding: '10px',
    border: '1px solid LightGray',
  });
};
