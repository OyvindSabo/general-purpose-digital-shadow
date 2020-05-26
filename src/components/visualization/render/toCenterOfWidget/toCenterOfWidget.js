const toCenterOfWidget = (canvasWidth, canvasHeight) => ([x, y, z]) => [
  x + canvasWidth / 2,
  y - canvasHeight / 2,
  z,
];

module.exports = toCenterOfWidget;
