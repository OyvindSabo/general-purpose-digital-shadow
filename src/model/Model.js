const Observable = include('src/libraries/observable/Observable.js');

const MAX_AMOUNT_OF_DERIVED_VALUES = 100;
const MAX_AMOUNT_OF_WIDGETS = 100;

const evaluateCode = (valuesCode, derivedValuesCode, widgetsCode) => {
  return eval(`
    const values = {};
    const derivedValues = {};
    const widgets = {};
    ${valuesCode}
    ${derivedValuesCode}
    ${widgetsCode}
    result = {
      values,
      derivedValues,
      widgets,
    };
  `);
};

const buyPrice$ = new Observable(100);
const sellPrice$ = new Observable(100);

const model = {
  derivedValuesEditorIsOpen$: new Observable(false),

  valuesCode$: new Observable(''),
  derivedValuesCode$: new Observable(''),
  widgetsCode$: new Observable(''),

  values: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(() => ({
    label$: new Observable(''),
    value$: new Observable(0),
    isEmpty$: new Observable(true),
  })),
  derivedValues: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(
    () => ({
      label$: new Observable(''),
      value$: new Observable(0),
      isEmpty$: new Observable(true),
    })
  ),
  widgets: [...new Array(MAX_AMOUNT_OF_DERIVED_VALUES).keys()].map(() => ({
    label$: new Observable(''),
    edges$: new Observable([]),
    surfaces$: new Observable([]),
    center$: new Observable([0, 0, 0]),
    isEmpty$: new Observable(true),
    is3d$: new Observable(false),
  })),
};

window.addEventListener(model.valuesCode$.id, () => {
  const evaluatedCode = evaluateCode(
    model.valuesCode$.value,
    model.derivedValuesCode$.value,
    model.widgetsCode$.value
  );

  const valuesEntries = Object.entries(evaluatedCode.values);
  model.values.forEach(({ label$, value$, isEmpty$ }, index) => {
    label$.value = valuesEntries[index] ? valuesEntries[index][0] : '';
    value$.value = valuesEntries[index] ? valuesEntries[index][1] : 0;
    isEmpty$.value = !Boolean(valuesEntries[index]);
  });

  const derivedValuesEntries = Object.entries(evaluatedCode.derivedValues);
  model.derivedValues.forEach(({ label$, value$, isEmpty$ }, index) => {
    label$.value = derivedValuesEntries[index]
      ? derivedValuesEntries[index][0]
      : '';
    value$.value = derivedValuesEntries[index]
      ? derivedValuesEntries[index][1]
      : 0;
    isEmpty$.value = !derivedValuesEntries[index];
  });

  const widgetsEntries = Object.entries(evaluatedCode.widgets);
  model.widgets.forEach(
    ({ label$, edges$, surfaces$, is3d$, center$, isEmpty$ }, index) => {
      label$.value = widgetsEntries[index] ? widgetsEntries[index][0] : '';
      edges$.value = widgetsEntries[index]
        ? widgetsEntries[index][1].edges || []
        : [];
      surfaces$.value = widgetsEntries[index]
        ? widgetsEntries[index][1].surfaces || []
        : [];
      center$.value = widgetsEntries[index]
        ? widgetsEntries[index][1].center || [0, 0, 0]
        : [0, 0, 0]; // TODO
      is3d$.value = widgetsEntries[index]
        ? widgetsEntries[index][1].is3d || false
        : false; // TODO
      isEmpty$.value = !widgetsEntries[index];
    }
  );
});

// We can pretend we are fetching data from an api here
const updateValues = () => {
  setTimeout(() => {
    buyPrice$.value =
      Math.floor(Math.random() * 2) == 1
        ? buyPrice$.value * 1.01
        : buyPrice$.value / 1.01;
    sellPrice$.value =
      Math.floor(Math.random() * 2) == 1
        ? sellPrice$.value * 1.01
        : sellPrice$.value / 1.01;
    model.valuesCode$.value = `
      values.buyPrice = ${buyPrice$.value};
      values.sellPrice = ${sellPrice$.value};
    `;
    updateValues();
  }, 100);
};
updateValues();

model.derivedValuesCode$.value = `
  derivedValues['A constant value'] = 45;
  derivedValues['Profit']           = values.sellPrice - values.buyPrice;
  derivedValues['Dollar Profit']    = derivedValues.Profit / 8;
  derivedValues['Compression (cm)'] = Math.random() * 10;
`;
model.widgetsCode$.value = `
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

  /*******************************************************************************
  3D PYRAMID
  *******************************************************************************/
  
  const profit = 100 + derivedValues.Profit;

  const point0 = [     0,      0,      0];
  const point1 = [     0,      0, profit];
  const point2 = [     0, profit,      0];
  const point3 = [profit,      0,      0];

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

  /*******************************************************************************
  2D BAR CHART
  *******************************************************************************/
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
`;

module.exports = model;
