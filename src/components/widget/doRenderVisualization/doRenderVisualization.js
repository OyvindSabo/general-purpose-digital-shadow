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
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  const transformPoint = pipe(
    toCenterOfStructure(center),
    rotateHorizontally(azimuthAngle),
    rotateVertically(polarAngle),
    toPerspective(d, focalLength),
    toCenterOfWidget(canvasWidth, canvasHeight)
  );

  // Render the faces
  surfaces.forEach(({ color, points }) => {
    points.map(transformPoint).forEach((point, index) => {
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
    const startPoint = transformPoint(points[0]);
    const endPoint = transformPoint(points[1]);

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
