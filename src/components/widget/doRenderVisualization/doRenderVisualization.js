const { pipe } = include('src/libraries/simpleFP/SimpleFP.js');
const toCenterOfWidget = include(
  'src/components/visualization/render/toCenterOfWidget/toCenterOfWidget.js'
);
const toPerspective = include(
  'src/components/visualization/render/toPerspective/toPerspective.js'
);
const toCenterOfStructure = include(
  'src/components/visualization/render/toCenterOfStructure/toCenterOfStructure.js'
);
const rotateHorizontally = include(
  'src/components/visualization/render/rotateHorizontally/rotateHorizontally.js'
);
const rotateVertically = include(
  'src/components/visualization/render/rotateVertically/rotateVertically.js'
);

/**
 * @param {number} dx
 * Defines the x coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} dy
 * Defines the y coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} dz
 * Defines the z coordinate which will be displayed in the center of the
 * visualization
 *
 * @param {number} d
 * Defines the distance from the defined center of the structure, to the
 * camera.
 */
const doRenderVisualization = ({
  surfaces,
  edges,
  ctx,
  center,
  azimuthAngle = 0,
  polarAngle = 0,
  d = 0,
  focalLength = 0,
}) => {
  // Render the faces
  surfaces.forEach(({ color, points }) => {
    points
      .map((point) =>
        pipe(
          toCenterOfStructure(center),
          rotateHorizontally(azimuthAngle),
          rotateVertically(polarAngle),
          (point) => toPerspective(point, d, focalLength),
          (point) => toCenterOfWidget(point, ctx)
        )(point)
      )
      .forEach((point, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(point[0], -point[1]);
          return;
        }
        if (index < points.length - 1) {
          ctx.lineTo(point[0], -point[1]);
          return;
        }
        if (index === points.length - 1) {
          ctx.lineTo(point[0], -point[1]);
          ctx.closePath();
          ctx.fillStyle = color;
          ctx.fill();
          return;
        }
      });
  });

  // Render the edges
  edges.forEach(({ color, points, width }) => {
    // Draw the first vertex
    const startPoint = pipe(
      toCenterOfStructure(center),
      rotateHorizontally(azimuthAngle),
      rotateVertically(polarAngle),
      (point) => toPerspective(point, d, focalLength),
      (point) => toCenterOfWidget(point, ctx)
    )(points[0]);

    const endPoint = pipe(
      toCenterOfStructure(center),
      rotateHorizontally(azimuthAngle),
      rotateVertically(polarAngle),
      (point) => toPerspective(point, d, focalLength),
      (point) => toCenterOfWidget(point, ctx)
    )(points[1]);

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(startPoint[0], -startPoint[1]);
    ctx.lineTo(endPoint[0], -endPoint[1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  });
};

module.exports = doRenderVisualization;
