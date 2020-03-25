const toCenterOfStructure = ([x, y, z], transformedCenterOfStructure) => [
  x - transformedCenterOfStructure[0],
  y - transformedCenterOfStructure[1],
  z - transformedCenterOfStructure[2],
];

module.exports = toCenterOfStructure;
