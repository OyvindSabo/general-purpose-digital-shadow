const styled = (Component, style) => (...children) =>
  Component(...children).setStyle(style);

module.exports = styled;
