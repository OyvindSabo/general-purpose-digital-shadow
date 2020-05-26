const toCenterOfWidget = (ctx) => ([x, y, z]) => [
  x + ctx.canvas.width / 2,
  y - ctx.canvas.height / 2,
  z,
];

module.exports = toCenterOfWidget;
