const NodeInfoBox$ = ({ id, x, y, z }) =>
  InfoBox$(
    div$(add$('id: ', id)),
    br$(),
    div$('Nodes:').setStyle({ fontWeight: 'bold' }),
    div$(add$('x: ', x)),
    div$(add$('y: ', y)),
    div$(add$('z: ', z))
  );
