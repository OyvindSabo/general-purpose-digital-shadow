const rotateVertically = (polarAngle) => ([x, y, z]) => [
  x,
  y * Math.cos(polarAngle) - z * Math.sin(polarAngle),
  y * Math.sin(polarAngle) + z * Math.cos(polarAngle),
];

module.exports = rotateVertically;
