const styled = style => Component => (...children) =>
  Component(...children).setStyle(style);

module.exports = styled;
