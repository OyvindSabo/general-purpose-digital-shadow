const toCenterOfStructure = (centerCoordinates) => (currentCoordinates) => [
  currentCoordinates[0] - centerCoordinates[0],
  currentCoordinates[1] - centerCoordinates[1],
  currentCoordinates[2] - centerCoordinates[2],
];

module.exports = toCenterOfStructure;
