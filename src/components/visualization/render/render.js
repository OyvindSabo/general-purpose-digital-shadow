const toCenterOfWidget = include(
  'src/components/visualization/render/toCenterOfWidget/toCenterOfWidget.js'
);
const toPerspective = include(
  'src/components/visualization/render/toPerspective/toPerspective.js'
);
const toCenterOfStructure = include(
  'src/components/visualization/render/toCenterOfStructure/toCenterOfStructure.js'
);
const rotate = include('src/components/visualization/render/rotate/rotate.js');

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
const render = (
  surfaces$,
  edges$,
  ctx,
  center,
  rx = 0,
  ry = 0,
  d = 0,
  focalLength = 0
) => {
  // Render the faces
  surfaces$.value.forEach(({ color, points }) => {
    points
      .map(point => toCenterOfStructure(point, center))
      .map(point => rotate(point, rx, ry))
      .map(point => toPerspective(point, d, focalLength))
      .map(point => toCenterOfWidget(point, ctx))
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
  edges$.value.forEach(({ color, points, width }) => {
    // Draw the first vertex
    const startPoint = toCenterOfWidget(
      toPerspective(
        rotate(toCenterOfStructure(points[0], center), rx, ry),
        d,
        focalLength
      ),

      ctx
    );
    const endPoint = toCenterOfWidget(
      toPerspective(
        rotate(toCenterOfStructure(points[1], center), rx, ry),
        d,
        focalLength
      ),
      ctx
    );
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(startPoint[0], -startPoint[1]);
    ctx.lineTo(endPoint[0], -endPoint[1]);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  });
};

module.exports = render;
