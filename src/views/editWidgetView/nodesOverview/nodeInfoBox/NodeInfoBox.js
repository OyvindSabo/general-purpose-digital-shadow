const NodeInfoBox$ = ({ id, x, y, z }) =>
  div$(
    div$(add$('id: ', id)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    div$(add$('x: ', x)),
    div$(add$('y: ', y)),
    div$(add$('z: ', z))
  ).setStyle({
    margin: '10px',
    padding: '10px',
    border: '1px solid LightGray',
  });
