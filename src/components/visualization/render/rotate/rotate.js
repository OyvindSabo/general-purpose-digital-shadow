const rotate = ([x, y, z], rx, ry) => {
  const theta = rx;
  const phi = ry;

  const horizontallyRotatedVertex = [
    x * Math.cos(theta) + z * Math.sin(theta),
    y,
    z * Math.cos(theta) - x * Math.sin(theta),
  ];

  return [
    horizontallyRotatedVertex[0],
    horizontallyRotatedVertex[1] * Math.cos(phi) -
      horizontallyRotatedVertex[2] * Math.sin(phi),
    horizontallyRotatedVertex[1] * Math.sin(phi) +
      horizontallyRotatedVertex[2] * Math.cos(phi),
  ];
};

module.exports = rotate;
