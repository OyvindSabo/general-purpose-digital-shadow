/* Global app state */
const state = new (function() {
  this.customDashboardWidgets = [
    {
      id: '0',
      vertices: [
        {
          id: '0',
          x$: new Observable(0),
          y$: new Observable(0),
          z$: new Observable(0),
        },
        {
          id: '1',
          x$: new Observable(0),
          y$: new Observable(0),
          z$: new Observable(100),
        },
        {
          id: '2',
          x$: new Observable(0),
          y$: new Observable(100),
          z$: new Observable(0),
        },
        {
          id: '3',
          x$: new Observable(100),
          y$: new Observable(0),
          z$: new Observable(0),
        },
      ],
      edges: [
        {
          id: '0',
          color$: new Observable('blue'),
          vertexIds: [new Observable('0'), new Observable('1')],
          width$: new Observable(2),
        },
        {
          id: '1',
          color$: new Observable('blue'),
          vertexIds: [new Observable('0'), new Observable('1')],
          width$: new Observable(2),
        },
        {
          id: '2',
          color$: new Observable('blue'),
          vertexIds: [new Observable('0'), new Observable('3')],
          width$: new Observable(2),
        },
        {
          id: '3',
          color$: new Observable('blue'),
          vertexIds: [new Observable('1'), new Observable('2')],
          width$: new Observable(2),
        },
        {
          id: '4',
          color$: new Observable('blue'),
          vertexIds: [new Observable('1'), new Observable('3')],
          width$: 2,
        },
        {
          id: '5',
          color$: new Observable('blue'),
          vertexIds: [new Observable('2'), new Observable('3')],
          width$: new Observable(2),
        },
      ],
      faces: [
        {
          id: '0',
          color$: new Observable('rgba(128, 128, 255, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('1'),
            new Observable('2'),
          ],
        },
        {
          id: '1',
          color$: new Observable('rgba(128, 128, 255, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('1'),
            new Observable('3'),
          ],
        },
        {
          id: '2',
          color$: new Observable('rgba(128, 128, 255, 0.5)'),
          vertexIds: [
            new Observable('1'),
            new Observable('2'),
            new Observable('3'),
          ],
        },
        {
          id: '3',
          color$: new Observable('rgba(128, 128, 255, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('2'),
            new Observable('3'),
          ],
        },
      ],
    },
    {
      id: '1',
      vertices: [
        {
          id: '0',
          x$: new Observable(0),
          y$: new Observable(0),
          z$: new Observable(0),
        },
        {
          id: '1',
          x$: new Observable(0),
          y$: new Observable(0),
          z$: new Observable(100),
        },
        {
          id: '2',
          x$: new Observable(0),
          y$: new Observable(100),
          z$: new Observable(0),
        },
        {
          id: '3',
          x$: new Observable(100),
          y$: new Observable(0),
          z$: new Observable(0),
        },
      ],
      edges: [
        {
          id: '0',
          color$: new Observable('red'),
          vertexIds: [new Observable('0'), new Observable('1')],
          width$: new Observable(2),
        },
        {
          id: '1',
          color$: new Observable('red'),
          vertexIds: [new Observable('0'), new Observable('2')],
          width$: new Observable(2),
        },
        {
          id: '2',
          color$: new Observable('red'),
          vertexIds: [new Observable('0'), new Observable('3')],
          width$: new Observable(2),
        },
        {
          id: '3',
          color$: new Observable('red'),
          vertexIds: [new Observable('1'), new Observable('2')],
          width$: new Observable(2),
        },
        {
          id: '4',
          color$: new Observable('red'),
          vertexIds: [new Observable('1'), new Observable('3')],
          width$: new Observable(2),
        },
        {
          id: '5',
          color$: new Observable('red'),
          vertexIds: [new Observable('2'), new Observable('3')],
          width$: new Observable(2),
        },
      ],
      faces: [
        {
          id: '0',
          color$: new Observable('rgba(255, 128, 128, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('1'),
            new Observable('2'),
          ],
        },
        {
          id: '1',
          color$: new Observable('rgba(255, 128, 128, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('1'),
            new Observable('3'),
          ],
        },
        {
          id: '2',
          color$: new Observable('rgba(255, 128, 128, 0.5)'),
          vertexIds: [
            new Observable('1'),
            new Observable('2'),
            new Observable('3'),
          ],
        },
        {
          id: '3',
          color$: new Observable('rgba(255, 128, 128, 0.5)'),
          vertexIds: [
            new Observable('0'),
            new Observable('2'),
            new Observable('3'),
          ],
        },
      ],
    },
  ];
  this.createNewCustomDashboardWidget = () => {
    const id = `${Math.random()}${+new Date()}`;
    this.customDashboardWidgets.push({
      id,
      vertices: [],
      edges: [],
      faces: [],
    });
    return id;
  };
  this.deleteCustomDashboardWidgetById = id => {
    this.customDashboardWidgets = this.customDashboardWidgets.filter(
      structure => structure.id !== id
    );
  };
  this.createOrUpdateEdge = ({ widgetId, edge: newEdge }) => {
    const widget = this.customDashboardWidgets.find(
      ({ id }) => id === widgetId
    );
    const alreadyExistingEdge =
      newEdge.id && widget.edges.find(edge => edge.id === newEdge.id);
    if (alreadyExistingEdge) {
      alreadyExistingEdge.color$.value = newEdge.color$.value;
      alreadyExistingEdge.nodes[0].value = newEdge.nodes[0].value;
      alreadyExistingEdge.nodes[0].value = newEdge.nodes[0].value;
      alreadyExistingEdge.width$.value = newEdge.width$.value;
    } else {
      widget.edges.push(newEdge);
    }
  };
})();
