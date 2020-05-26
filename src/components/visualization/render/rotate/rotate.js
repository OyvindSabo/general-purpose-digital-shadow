const { pipe } = include('src/libraries/simpleFP/SimpleFP.js');

const rotateHorizontally = (azimuthAngle) => ([x, y, z]) => [
  x * Math.cos(azimuthAngle) + z * Math.sin(azimuthAngle),
  y,
  z * Math.cos(azimuthAngle) - x * Math.sin(azimuthAngle),
];

const rotateVertically = (polarAngle) => ([x, y, z]) => [
  x,
  y * Math.cos(polarAngle) - z * Math.sin(polarAngle),
  y * Math.sin(polarAngle) + z * Math.cos(polarAngle),
];

const rotate = (currentCoordinates, azimuthAngle, polarAngle) =>
  pipe(
    rotateHorizontally(azimuthAngle),
    rotateVertically(polarAngle)
  )(currentCoordinates);

module.exports = rotate;
