/* Global app state */
const state = new (function() {
  this.customDashboardWidgets = [
    {
      id: '0',
      vertices: [
        { id: '0', x: 0, y: 0, z: 0 },
        { id: '1', x: 0, y: 0, z: 100 },
        { id: '2', x: 0, y: 100, z: 0 },
        { id: '3', x: 100, y: 0, z: 0 },
      ],
      edges: [
        {
          color: 'blue',
          vertexIds: ['0', '1'],
          width: 2,
        },
        {
          color: 'blue',
          vertexIds: ['0', '2'],
          width: 2,
        },
        {
          color: 'blue',
          vertexIds: ['0', '3'],
          width: 2,
        },
        {
          color: 'blue',
          vertexIds: ['1', '2'],
          width: 2,
        },
        {
          color: 'blue',
          vertexIds: ['1', '3'],
          width: 2,
        },
        {
          color: 'blue',
          vertexIds: ['2', '3'],
          width: 2,
        },
      ],
      faces: [
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertexIds: ['0', '1', '2'],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertexIds: ['0', '1', '3'],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertexIds: ['1', '2', '3'],
        },
        {
          color: 'rgba(128, 128, 255, 0.5)',
          vertexIds: ['0', '2', '3'],
        },
      ],
    },
    {
      id: '1',
      vertices: [
        { id: '0', x: 0, y: 0, z: 0 },
        { id: '1', x: 0, y: 0, z: 100 },
        { id: '2', x: 0, y: 100, z: 0 },
        { id: '3', x: 100, y: 0, z: 0 },
      ],
      edges: [
        {
          color: 'red',
          vertexIds: ['0', '1'],
          width: 2,
        },
        {
          color: 'red',
          vertexIds: ['0', '2'],
          width: 2,
        },
        {
          color: 'red',
          vertexIds: ['0', '3'],
          width: 2,
        },
        {
          color: 'red',
          vertexIds: ['1', '2'],
          width: 2,
        },
        {
          color: 'red',
          vertexIds: ['1', '3'],
          width: 2,
        },
        {
          color: 'red',
          vertexIds: ['2', '3'],
          width: 2,
        },
      ],
      faces: [
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertexIds: ['0', '1', '2'],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertexIds: ['0', '1', '3'],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertexIds: ['1', '2', '3'],
        },
        {
          color: 'rgba(255, 128, 128, 0.5)',
          vertexIds: ['0', '2', '3'],
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
  this.createEdge = ({ widgetId, edge }) => {
    const widget = this.customDashboardWidgets.find(
      ({ id }) => id === widgetId
    );
    widget.edges.push(edge);
  };
})();
