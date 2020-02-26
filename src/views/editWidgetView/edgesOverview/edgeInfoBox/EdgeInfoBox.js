const EdgeInfoBox$ = ({ color, vertices, width }) =>
  div$(
    div$(add$('color: ', color)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    div$(add$('Node ', vertices[0].id)),
    div$(add$('Node ', vertices[1].id)),
    br$(),
    div$(add$('width: ', width))
  ).setStyle({
    margin: '10px',
    padding: '10px',
    border: '1px solid LightGray',
  });
