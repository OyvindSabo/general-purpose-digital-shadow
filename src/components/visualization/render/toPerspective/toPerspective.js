const toPerspective = (d, focalLength) => ([x, y, z]) => {
  if (!focalLength) return [x, y, z];
  return [
    x * (focalLength / (d + focalLength + z)),
    y * (focalLength / (d + focalLength + z)),
    z,
  ];
};

module.exports = toPerspective;
