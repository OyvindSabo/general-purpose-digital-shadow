const getAllProjects = () => [
  { id: '0', name: 'Double wishbone suspension' },
  { id: '1', name: '3D pyramid' },
  { id: '2', name: 'Bar charts' },
];

const getDerivedValuesCodeByProjectId = id =>
  ({
    0: `
  derivedValues['Compression (cm)'] = Math.random() * 10;
  `,
    1: `
  derivedValues['Pyramid Width (cm)' ] = 100 + Math.random() * 10;
  derivedValues['Pyramid Height (cm)'] = 100 + Math.random() * 10;
  derivedValues['Pyramid Depth (cm)' ] = 100 + Math.random() * 10;
  `,
    2: `
  derivedValues['Profit']           = values.sellPrice - values.buyPrice;
  `,
  }[id]);

const getWidgetsCodeByProjectId = id =>
  ({
    0: `
  /*******************************************************************************
  DOUBLE WISHBONE SUSPENSION
  *******************************************************************************/
  
  const compression = derivedValues['Compression (cm)'];
  widgets['Double Wisbone Suspension'] = {
    edges: [
      // Front frame
      { points: [[-25, 0, 0], [25, 0, 0]], color: 'black', width: 2 },
      { points: [[-25, 40, 0], [25, 40, 0]], color: 'black', width: 2 },
      { points: [[-25, 0, 0], [-25, 40, 0]], color: 'black', width: 2 },
      { points: [[25, 0, 0], [25, 40, 0]], color: 'black', width: 2 },

      // Rear frame
      { points: [[-25, 0, 275], [25, 0, 275]], color: 'black', width: 2 },
      { points: [[-25, 40, 275], [25, 40, 275]], color: 'black', width: 2 },
      { points: [[-25, 0, 275], [-25, 40, 275]], color: 'black', width: 2 },
      { points: [[25, 0, 275], [25, 40, 275]], color: 'black', width: 2 },

      // Bottom left frame rails
      { points: [[25, 0, 0], [25, 0, 25]], color: 'black', width: 2 },
      { points: [[25, 0, 25], [50, 0, 150]], color: 'black', width: 2 },
      { points: [[50, 0, 150], [50, 0, 225]], color: 'black', width: 2 },
      { points: [[50, 0, 225], [25, 0, 250]], color: 'black', width: 2 },
      { points: [[25, 0, 250], [25, 0, 275]], color: 'black', width: 2 },

      // Bottom right frame rails
      { points: [[-25, 0, 0], [-25, 0, 25]], color: 'black', width: 2 },
      { points: [[-25, 0, 25], [-50, 0, 150]], color: 'black', width: 2 },
      { points: [[-50, 0, 150], [-50, 0, 225]], color: 'black', width: 2 },
      { points: [[-50, 0, 225], [-25, 0, 250]], color: 'black', width: 2 },
      { points: [[-25, 0, 250], [-25, 0, 275]], color: 'black', width: 2 },

      // Top left frame rails
      { points: [[25, 40, 0], [25, 40, 25]], color: 'black', width: 2 },
      { points: [[25, 40, 25], [50, 40, 150]], color: 'black', width: 2 },
      { points: [[50, 40, 150], [50, 40, 225]], color: 'black', width: 2 },
      { points: [[50, 40, 225], [25, 40, 250]], color: 'black', width: 2 },
      { points: [[25, 40, 250], [25, 40, 275]], color: 'black', width: 2 },

      // Top right frame rails
      { points: [[-25, 40, 0], [-25, 40, 25]], color: 'black', width: 2 },
      { points: [[-25, 40, 25], [-50, 40, 150]], color: 'black', width: 2 },
      { points: [[-50, 40, 150], [-50, 40, 225]], color: 'black', width: 2 },
      { points: [[-50, 40, 225], [-25, 40, 250]], color: 'black', width: 2 },
      { points: [[-25, 40, 250], [-25, 40, 275]], color: 'black', width: 2 },

      // Left diagonal struts
      { points: [[25, 40, 25], [25, 0, 25]], color: 'black', width: 2 },
      { points: [[25, 0, 25], [50, 40, 150]], color: 'black', width: 2 },
      { points: [[50, 40, 150], [50, 0, 150]], color: 'black', width: 2 },
      { points: [[50, 0, 150], [50, 40, 225]], color: 'black', width: 2 },
      { points: [[50, 0, 225], [25, 40, 250]], color: 'black', width: 2 },
      { points: [[25, 0, 250], [25, 40, 275]], color: 'black', width: 2 },

      // Right diagonal struts
      { points: [[-25, 40, 25], [-25, 0, 25]], color: 'black', width: 2 },
      { points: [[-25, 0, 25], [-50, 40, 150]], color: 'black', width: 2 },
      { points: [[-50, 40, 150], [-50, 0, 150]], color: 'black', width: 2 },
      { points: [[-50, 0, 150], [-50, 40, 225]], color: 'black', width: 2 },
      { points: [[-50, 0, 225], [-25, 40, 250]], color: 'black', width: 2 },
      { points: [[-25, 0, 250], [-25, 40, 275]], color: 'black', width: 2 },

      // Top
      { points: [[50, 40, 225], [50, 60, 250]], color: 'black', width: 2 },
      { points: [[50, 60, 250], [50, 60, 275]], color: 'black', width: 2 },
      { points: [[50, 60, 275], [25, 40, 275]], color: 'black', width: 2 },
      { points: [[50, 60, 250], [25, 40, 250]], color: 'black', width: 2 },
      { points: [[-25, 40, 25], [25, 40, 25]], color: 'black', width: 2 },

      { points: [[-50, 40, 225], [-50, 60, 250]], color: 'black', width: 2 },
      { points: [[-50, 60, 250], [-50, 60, 275]], color: 'black', width: 2 },
      { points: [[-50, 60, 275], [-25, 40, 275]], color: 'black', width: 2 },
      { points: [[-50, 60, 250], [-25, 40, 250]], color: 'black', width: 2 },

      { points: [[-50, 60, 250], [50, 60, 250]], color: 'black', width: 2 },
      { points: [[-50, 60, 275], [50, 60, 275]], color: 'black', width: 2 },
      { points: [[-25, 40, 250], [25, 40, 250]], color: 'black', width: 2 },
      { points: [[-50, 40, 150], [50, 40, 150]], color: 'black', width: 2 },

      // Bottom
      { points: [[-50, 0, 150], [50, 0, 150]], color: 'black', width: 2 },
      { points: [[-25, 0, 25], [25, 0, 25]], color: 'black', width: 2 },
      
      // Front left wishbones
      { points: [[25, 0, 0], [75, -5 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[25, 0, 25], [75, -5 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[25, 40, 0], [75, 35 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[25, 40, 25], [75, 35 + compression, 12.5]], color: 'black', width: 2 },

      // Front right wishbones
      { points: [[-25, 0, 0], [-75, -5 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[-25, 0, 25], [-75, -5 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[-25, 40, 0], [-75, 35 + compression, 12.5]], color: 'black', width: 2 },
      { points: [[-25, 40, 25], [-75, 35 + compression, 12.5]], color: 'black', width: 2 },

      // Rear left wishbones
      { points: [[25, 0, 250], [75, -5 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[25, 0, 275], [75, -5 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[25, 40, 250], [75, 35 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[25, 40, 275], [75, 35 + compression, 262.5]], color: 'black', width: 2 },

      // Rear right wishbones
      { points: [[-25, 0, 250], [-75, -5 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[-25, 0, 275], [-75, -5 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[-25, 40, 250], [-75, 35 + compression, 262.5]], color: 'black', width: 2 },
      { points: [[-25, 40, 275], [-75, 35 + compression, 262.5]], color: 'black', width: 2 },
    ],
    center: [0, 20, 125],
    is3d: true,
  }
  `,
    1: `
  /*******************************************************************************
  3D PYRAMID
  *******************************************************************************/
  
  const height = derivedValues['Pyramid Height (cm)'];
  const width = derivedValues['Pyramid Width (cm)'];
  const depth = derivedValues['Pyramid Depth (cm)'];
  const profit = 100 + derivedValues.Profit;

  const point0 = [    0,      0,     0];
  const point1 = [    0,      0, depth];
  const point2 = [    0, height,     0];
  const point3 = [width,      0,     0];

  const surfaceColor = 'rgba(128, 128, 255, 0.5)';
  const edgeColor = 'blue';

  // We create the faces
  const surface0 = { color: surfaceColor, points: [point0, point1, point2] };
  const surface1 = { color: surfaceColor, points: [point0, point1, point3] };
  const surface2 = { color: surfaceColor, points: [point1, point2, point3] };
  const surface3 = { color: surfaceColor, points: [point0, point2, point3] };

  // We create the edges
  const edge0 = { color: edgeColor, points: [point0, point1], width: 2 };
  const edge1 = { color: edgeColor, points: [point0, point2], width: 2 };
  const edge2 = { color: edgeColor, points: [point0, point3], width: 2 };
  const edge3 = { color: edgeColor, points: [point1, point2], width: 2 };
  const edge4 = { color: edgeColor, points: [point1, point3], width: 2 };
  const edge5 = { color: edgeColor, points: [point2, point3], width: 2 };

  // We create the widget
  widgets.Pyramid = {
    surfaces: [surface0, surface1, surface2, surface3],
    edges: [edge0, edge1, edge2, edge3, edge4, edge5],
    is3d: true,
  };
  `,
    2: `
  /*******************************************************************************
  2D BAR CHART
  *******************************************************************************/
 const profit = 100 + derivedValues.Profit;
  
  widgets['Bar Chart'] = {
    surfaces: [{
      color: \`rgba(0, 255, 0, 0.5)\`,
      points: [[ 0,      0, 0],
               [ 0, profit, 0],
               [10, profit, 0],
               [10,      0, 0]]
    },
    {
      color: \`rgba(0, 255, 0, 0.5)\`,
      points: [[20,      0, 0],
               [20, profit, 0],
               [30, profit, 0],
               [30,      0, 0]]
    }],
    center: [15, 50, 0],
  }

  /*******************************************************************************
  3D BAR CHART
  *******************************************************************************/
  widgets['3D Bar Chart'] = {
    surfaces: [
      {
        color: 'black',
        points: [[ 0, 0,       0],
                 [ 0, 0, profit],
                 [10, 0, profit],
                 [10, 0,      0 ]],
      },
      {
        color: 'black',
        points: [[20, 0,       0],
                 [20, 0, profit],
                 [30, 0, profit],
                 [30, 0,      0 ]],
      },
      {
        color: \`rgba(0, 255, 0, 0.5)\`,
        points: [[ 0,      0, 0],
                 [ 0, profit, 0],
                 [10, profit, 0],
                 [10,      0, 0]],
      },
      {
        color: \`rgba(0, 255, 0, 0.5)\`,
        points: [[20,      0, 0],
                 [20, profit, 0],
                 [30, profit, 0],
                 [30,      0, 0]],
      },
    ],
    center: [15, 50, 0],
    is3d: true,
  }
  `,
  }[id]);

module.exports = {
  getAllProjects,
  getDerivedValuesCodeByProjectId,
  getWidgetsCodeByProjectId,
};
