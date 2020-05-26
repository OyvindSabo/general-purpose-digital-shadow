const toCenterOfStructure = ([centerX, centerY, centerZ]) => ([x, y, z]) => [
  x - centerX,
  y - centerY,
  z - centerZ,
];

module.exports = toCenterOfStructure;
