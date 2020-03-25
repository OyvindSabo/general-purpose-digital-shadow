const toPerspective = ([x, y, z], d, focalLength) =>
  focalLength
    ? [
        x * (focalLength / (d + focalLength + z)),
        y * (focalLength / (d + focalLength + z)),
        z,
      ]
    : [x, y, z];

module.exports = toPerspective;
