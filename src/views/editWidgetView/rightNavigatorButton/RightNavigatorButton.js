const RightNavigatorButton = ({ icon, label, isActive }) => {
  const Button = (...children) =>
    div$(...children).setStyle({
      height: '80px',
      width: '80px',
      overflow: 'hidden',
      transition: '0.25s',
      cursor: 'pointer',
    });
  const Icon = (...children) =>
    div$(...children).setStyle({
      fontSize: '30px',
      textAlign: 'center',
      marginTop: '15px',
      pointerEvents: 'none',
      userSelect: 'none',
    });
  const Label = (...children) =>
    div$(...children).setStyle({
      fontSize: '15px',
      textAlign: 'center',
      pointerEvents: 'none',
      userSelect: 'none',
    });
  return Button(Icon(icon), Label(label))
    .setStyle({
      background: choose$(isActive, 'WhiteSmoke', 'initial'),
      color: choose$(isActive, 'DimGray', 'Gray'),
      display: 'inline-block',
    })
    .onMouseEnter(element =>
      element.setStyle({
        background: 'WhiteSmoke',
        color: 'DimGray',
      })
    )
    .onMouseLeave(element =>
      element.setStyle({
        background: choose$(isActive, 'WhiteSmoke', 'initial'),
        color: choose$(isActive, 'DimGray', 'Gray'),
      })
    );
};
