const rotateHorizontally = (azimuthAngle) => ([x, y, z]) => [
  x * Math.cos(azimuthAngle) + z * Math.sin(azimuthAngle),
  y,
  z * Math.cos(azimuthAngle) - x * Math.sin(azimuthAngle),
];

module.exports = rotateHorizontally;
