const toPerspective = (d, focalLength) => ([x, y, z]) =>
  focalLength
    ? [
        x * (focalLength / (d + focalLength + z)),
        y * (focalLength / (d + focalLength + z)),
        z,
      ]
    : [x, y, z];

module.exports = toPerspective;
