const InfoBox$ = (...children) =>
  div$(...children).setStyle({
    margin: '10px',
    padding: '10px',
    border: '1px solid LightGray',
  });
