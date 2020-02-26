const RightNavigator$ = (...children) =>
  div$(...children).setStyle({
    height: '100%',
    width: '480px',
    borderRadius: '0 10px 0 0',
    borderLeft: '1px solid LightGray',
    overflow: 'hidden',
    float: 'right',
    background: 'White',
  });
