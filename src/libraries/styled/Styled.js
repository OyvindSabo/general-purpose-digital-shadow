const Styled = (Component, style) => (...children) =>
  Component(...children).setStyle(style);

module.exports = Styled;
